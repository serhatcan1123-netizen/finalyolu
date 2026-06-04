'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { GROUPS, TEAMS } from '@/lib/api/mock-data';
import {
  getEmptyPrediction,
  type TournamentPrediction,
  type GroupPrediction,
  type KnockoutPrediction,
} from '@/lib/prediction/algorithm';
import { loadPrediction, savePrediction, resetPrediction } from '@/lib/prediction/storage';
import GroupPredictor from '@/components/predict/GroupPredictor';
import { KnockoutMatch, getRoundOf32Matchups, buildNextRound } from '@/components/predict/KnockoutBracket';
import ScoreModal from '@/components/predict/ScoreModal';
import ShareCard from '@/components/predict/ShareCard';
import AdBanner from '@/components/layout/AdBanner';

const STAGES = [
  'groups',
  'playoffs',
  'roundOf32',
  'roundOf16',
  'quarterFinals',
  'semiFinals',
  'final',
  'summary',
] as const;
type Stage = (typeof STAGES)[number];

function getStageLabels(t: (key: string) => string): Record<Stage, string> {
  return {
    groups: t('predict.stage_groups'),
    playoffs: t('predict.stage_playoffs'),
    roundOf32: t('predict.stage_r32'),
    roundOf16: t('predict.stage_r16'),
    quarterFinals: t('predict.stage_qf'),
    semiFinals: t('predict.stage_sf'),
    final: t('predict.stage_final'),
    summary: t('predict.stage_summary'),
  };
}

const STAGE_ICONS: Record<Stage, string> = {
  groups: '⚽',
  playoffs: '3.',
  roundOf32: '32',
  roundOf16: '16',
  quarterFinals: '8',
  semiFinals: '4',
  final: '🏆',
  summary: '✓',
};

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = (current / total) * 100;
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#2A2A3A' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #C9A84C, #E8C96A)' }}
      />
    </div>
  );
}

export default function PredictPage() {
  const { t, locale } = useI18n();
  const [stage, setStage] = useState<Stage>('groups');
  const [groupPage, setGroupPage] = useState(0);
  const [prediction, setPrediction] = useState<TournamentPrediction>(getEmptyPrediction);
  const [scoreModalData, setScoreModalData] = useState<{ matchId: string; homeSlug: string | null; awaySlug: string | null; winnerSlug: string | null } | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playoffPicks, setPlayoffPicks] = useState<string[]>([]);

  useEffect(() => {
    setPrediction(loadPrediction());
  }, []);

  function updateGroupPrediction(groupPred: GroupPrediction) {
    setPrediction(prev => {
      const groups = prev.groups.filter(g => g.groupId !== groupPred.groupId);
      return { ...prev, groups: [...groups, groupPred] };
    });
  }

  function openScoreModal(matchId: string, homeSlug: string | null, awaySlug: string | null, winnerSlug: string | null) {
    setScoreModalData({ matchId, homeSlug, awaySlug, winnerSlug });
  }

  function updateScore(matchId: string, score: { home: number; away: number }) {
    setPrediction(prev => ({
      ...prev,
      knockoutScores: { ...(prev.knockoutScores || {}), [matchId]: score },
    }));
  }

  function updateKnockout(stageKey: keyof Pick<TournamentPrediction, 'roundOf32' | 'roundOf16' | 'quarterFinals' | 'semiFinals' | 'thirdPlace' | 'final'>, matchId: string, winner: string) {
    setPrediction(prev => ({
      ...prev,
      [stageKey]: { ...prev[stageKey], [matchId]: winner },
    }));
  }

  function handleSave() {
    savePrediction(prediction);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    resetPrediction();
    setPrediction(getEmptyPrediction());
    setStage('groups');
    setGroupPage(0);
    setShowResetModal(false);
  }

  const STAGE_LABELS = getStageLabels(t);
  const stageIndex = STAGES.indexOf(stage);

  // Derived matchups
  const r32Matchups = getRoundOf32Matchups(prediction.groups, playoffPicks);
  const r16Matchups = buildNextRound(
    r32Matchups.slice(0, 16),
    prediction.roundOf32,
    'r16'
  );
  const qfMatchups = buildNextRound(r16Matchups, prediction.roundOf16, 'qf');
  const sfMatchups = buildNextRound(qfMatchups, prediction.quarterFinals, 'sf');
  const finalMatchups = buildNextRound(sfMatchups, prediction.semiFinals, 'final');

  // Auto-set champion from final winner
  useEffect(() => {
    const finalWinner = finalMatchups[0] && prediction.final[finalMatchups[0].matchId];
    if (finalWinner && finalWinner !== prediction.champion) {
      setPrediction(prev => ({ ...prev, champion: finalWinner }));
    }
  }, [prediction.final]);

  const champion = prediction.champion ? Object.values(TEAMS).find(t => t.slug === prediction.champion) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl tracking-widest uppercase" style={{ color: '#F0F0F5' }}>
            {t('predict.title')}
          </h1>
          <p className="text-sm mt-1" style={{ color: '#8A8A9A' }}>
            Tüm turnuvayı tahmin et · Skorunu kazan · Arkadaşlarınla paylaş
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowResetModal(true)}
            className="text-sm px-4 py-2 rounded-lg border transition-all"
            style={{ color: '#E63946', borderColor: 'rgba(230,57,70,0.3)', background: 'transparent' }}
          >
            {locale === 'en' ? '🗑 Reset' : '🗑 Sıfırla'}
          </button>
          <button onClick={handleSave} className="btn-primary text-sm px-4 py-2 rounded-lg">
            {saved ? locale === 'en' ? '✓ Saved!' : '✓ Kaydedildi!' : locale === 'en' ? '💾 Save' : '💾 Kaydet'}
          </button>
        </div>
      </div>

      {/* Stage tabs */}
      <div className="overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4">
        <div className="flex gap-1" style={{ minWidth: 'max-content' }}>
          {STAGES.map((s, i) => (
            <button
              key={s}
              onClick={() => { if (i <= stageIndex + 1) setStage(s); }}
              className="flex flex-col items-center px-3 py-2 rounded-lg border transition-all text-xs min-w-[60px]"
              style={{
                background: stage === s ? '#C9A84C' : i <= stageIndex ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: stage === s ? '#0A0A0F' : i <= stageIndex ? '#C9A84C' : '#8A8A9A',
                borderColor: stage === s ? '#C9A84C' : i <= stageIndex ? 'rgba(201,168,76,0.3)' : '#2A2A3A',
                fontWeight: stage === s ? 700 : 400,
              }}
            >
              <span className="text-base">{STAGE_ICONS[s]}</span>
              <span className="mt-0.5 font-mono-custom" style={{ fontSize: '0.6rem' }}>{STAGE_LABELS[s]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <ProgressBar current={stageIndex} total={STAGES.length - 1} />
      </div>

      {/* ===== GROUP STAGE ===== */}
      {stage === 'groups' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl tracking-widest uppercase" style={{ color: '#C9A84C' }}>
              GRUP {GROUPS[groupPage].id} · {groupPage + 1} / {GROUPS.length}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setGroupPage(p => Math.max(0, p - 1))}
                disabled={groupPage === 0}
                className="px-3 py-1.5 rounded-lg border text-sm transition-all disabled:opacity-30"
                style={{ borderColor: '#2A2A3A', color: '#8A8A9A' }}
              >
                ←
              </button>
              <button
                onClick={() => setGroupPage(p => Math.min(GROUPS.length - 1, p + 1))}
                disabled={groupPage === GROUPS.length - 1}
                className="px-3 py-1.5 rounded-lg border text-sm transition-all disabled:opacity-30"
                style={{ borderColor: '#2A2A3A', color: '#8A8A9A' }}
              >
                →
              </button>
            </div>
          </div>

          <GroupPredictor
            groupIndex={groupPage}
            prediction={prediction.groups.find(g => g.groupId === GROUPS[groupPage].id)}
            onChange={updateGroupPrediction}
          />

          {/* Group dots navigation */}
          <div className="flex gap-1.5 justify-center mt-4 flex-wrap">
            {GROUPS.map((g, i) => {
              const hasPred = prediction.groups.some(p => p.groupId === g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => setGroupPage(i)}
                  className="w-6 h-6 rounded-full text-xs font-mono-custom transition-all"
                  style={{
                    background: i === groupPage ? '#C9A84C' : hasPred ? 'rgba(201,168,76,0.3)' : '#2A2A3A',
                    color: i === groupPage ? '#0A0A0F' : '#F0F0F5',
                  }}
                >
                  {g.id}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <div />
            <button
              onClick={() => setStage('playoffs')}
              className="btn-primary px-6 py-3"
            >
              {locale === 'en' ? 'Playoff Selection →' : 'Play-off Seçimine Geç →'}
            </button>
          </div>
        </div>
      )}


      {stage === 'playoffs' && (() => {
        const thirdPlaceTeams = GROUPS.map(grp => {
          const pred = prediction.groups.find(g => g.groupId === grp.id);
          const order = pred?.teamOrder || grp.teams.map(t => t.slug);
          return { slug: order[2] || null, groupId: grp.id };
        }).filter(x => x.slug) as { slug: string; groupId: string }[];

        const toggle = (slug: string) => {
          setPlayoffPicks(prev =>
            prev.includes(slug) ? prev.filter(s => s !== slug) : prev.length < 8 ? [...prev, slug] : prev
          );
        };

        return (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display text-2xl tracking-widest uppercase" style={{ color: '#C9A84C' }}>
                PLAY-OFF SEÇİMİ
              </h2>
              <span className="text-sm font-mono-custom" style={{ color: playoffPicks.length === 8 ? '#C9A84C' : '#8A8A9A' }}>
                {playoffPicks.length} / 8 seçildi
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: '#8A8A9A' }}>
              12 grubun 3. sıralarından Son 32'ye geçecek 8 takımı seç.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {thirdPlaceTeams.map(({ slug, groupId }) => {
                const team = Object.values(TEAMS).find(t => t.slug === slug);
                if (!team) return null;
                const selected = playoffPicks.includes(slug);
                const disabled = !selected && playoffPicks.length >= 8;
                return (
                  <button key={slug} onClick={() => toggle(slug)} disabled={disabled}
                    className="flex items-center gap-2 p-3 rounded-xl border transition-all text-left"
                    style={{ background: selected ? 'rgba(201,168,76,0.15)' : 'rgba(26,26,36,0.8)', borderColor: selected ? '#C9A84C' : '#2A2A3A', opacity: disabled ? 0.35 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
                    <img src={team.flag} alt="" style={{ width: '28px', height: '19px', borderRadius: '3px', objectFit: 'cover', flexShrink: 0 }} />
                    <div>
                      <div className="text-xs font-semibold" style={{ color: selected ? '#C9A84C' : '#F0F0F5' }}>{team.name}</div>
                      <div className="text-xs font-mono-custom" style={{ color: '#8A8A9A' }}>Grup {groupId}</div>
                    </div>
                    {selected && <span className="ml-auto text-xs" style={{ color: '#C9A84C' }}>✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStage('groups')} className="btn-secondary px-6 py-3">← Geri</button>
              <button onClick={() => setStage('roundOf32')} disabled={playoffPicks.length !== 8}
                className="btn-primary px-6 py-3" style={{ opacity: playoffPicks.length !== 8 ? 0.4 : 1 }}>
                {locale === 'en' ? 'Round of 32 →' : "Son 32'ye Geç →"}
              </button>
            </div>
          </div>
        );
      })()}

      {/* ===== ROUND OF 32 ===== */}
      {stage === 'roundOf32' && (
        <KnockoutStage
          title="SON 32"
          matchups={r32Matchups}
          results={prediction.roundOf32}
          onSelect={(matchId, winner) => updateKnockout('roundOf32', matchId, winner)}
          knockoutScores={prediction.knockoutScores}
          onSetScore={openScoreModal}
          onNext={() => setStage('roundOf16')}
          onPrev={() => setStage('groups')}
          {...(locale === 'en' ? {nextLabel: 'Round of 16 →'} : {nextLabel: "Son 16'ya Geç →"})}
        />
      )}

      {/* ===== ROUND OF 16 ===== */}
      {stage === 'roundOf16' && (
        <KnockoutStage
          title="SON 16"
          matchups={r16Matchups}
          results={prediction.roundOf16}
          onSelect={(matchId, winner) => updateKnockout('roundOf16', matchId, winner)}
          knockoutScores={prediction.knockoutScores}
          onSetScore={openScoreModal}
          onNext={() => setStage('quarterFinals')}
          onPrev={() => setStage('roundOf32')}
          {...(locale === 'en' ? {nextLabel: 'Quarter Finals →'} : {nextLabel: 'Çeyrek Finale Geç →'})}
        />
      )}

      {/* ===== QUARTER FINALS ===== */}
      {stage === 'quarterFinals' && (
        <KnockoutStage
          title="ÇEYREK FİNAL"
          matchups={qfMatchups}
          results={prediction.quarterFinals}
          onSelect={(matchId, winner) => updateKnockout('quarterFinals', matchId, winner)}
          knockoutScores={prediction.knockoutScores}
          onSetScore={openScoreModal}
          onNext={() => setStage('semiFinals')}
          onPrev={() => setStage('roundOf16')}
          {...(locale === 'en' ? {nextLabel: 'Semi Finals →'} : {nextLabel: 'Yarı Finale Geç →'})}
        />
      )}

      {/* ===== SEMI FINALS ===== */}
      {stage === 'semiFinals' && (
        <KnockoutStage
          title="YARI FİNAL"
          matchups={sfMatchups}
          results={prediction.semiFinals}
          onSelect={(matchId, winner) => updateKnockout('semiFinals', matchId, winner)}
          knockoutScores={prediction.knockoutScores}
          onSetScore={openScoreModal}
          onNext={() => setStage('final')}
          onPrev={() => setStage('quarterFinals')}
          {...(locale === 'en' ? {nextLabel: 'Final →'} : {nextLabel: 'Finale Geç →'})}
        />
      )}

      {/* ===== FINAL ===== */}
      {stage === 'final' && (
        <div>
          <h2 className="font-display text-3xl tracking-widest uppercase mb-6" style={{ color: '#C9A84C' }}>
            🏆 FİNAL
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Final match */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: '#8A8A9A' }}>Final Maçı</h3>
              {finalMatchups.length > 0 && (
                <KnockoutMatch
                  matchId={finalMatchups[0].matchId}
                  homeSlug={finalMatchups[0].home}
                  awaySlug={finalMatchups[0].away}
                  winnerSlug={prediction.final[finalMatchups[0].matchId] || null}
                  onSelectWinner={(matchId, winner) => updateKnockout('final', matchId, winner)}
                  score={prediction.knockoutScores?.[finalMatchups[0]?.matchId]}
                  onSetScore={(matchId) => openScoreModal(matchId, finalMatchups[0].home, finalMatchups[0].away, prediction.final[matchId] || null)}
                />
              )}
            </div>

            {/* 3rd place */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: '#8A8A9A' }}>
                Üçüncülük Maçı
              </h3>
              {sfMatchups.length >= 2 && (
                <KnockoutMatch
                  matchId="3rd_place"
                  homeSlug={prediction.semiFinals[sfMatchups[0]?.matchId] ? (
                    sfMatchups[0].home === prediction.semiFinals[sfMatchups[0].matchId] ? sfMatchups[0].away : sfMatchups[0].home
                  ) : null}
                  awaySlug={prediction.semiFinals[sfMatchups[1]?.matchId] ? (
                    sfMatchups[1].home === prediction.semiFinals[sfMatchups[1].matchId] ? sfMatchups[1].away : sfMatchups[1].home
                  ) : null}
                  winnerSlug={prediction.thirdPlace['3rd_place'] || null}
                  onSelectWinner={(matchId, winner) => updateKnockout('thirdPlace', matchId, winner)}
                  score={prediction.knockoutScores?.['3rd_place']}
                  onSetScore={(matchId) => openScoreModal(matchId, null, null, prediction.thirdPlace[matchId] || null)}
                />
              )}
            </div>
          </div>

          {/* Awards */}
          <div className="card p-6 mb-6">
            <h3 className="font-display text-xl tracking-widest mb-4" style={{ color: '#C9A84C' }}>
              ÖDÜLLER
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest mb-2 block font-mono-custom" style={{ color: '#8A8A9A' }}>
                  👟 {t('predict.top_scorer_label')}
                </label>
                <input
                  type="text"
                  placeholder={t('predict.top_scorer_placeholder')}
                  value={prediction.topScorer}
                  onChange={e => setPrediction(prev => ({ ...prev, topScorer: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: '#111118', border: '1px solid #2A2A3A', color: '#F0F0F5' }}
                  onFocus={e => { e.target.style.borderColor = '#C9A84C'; }}
                  onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest mb-2 block font-mono-custom" style={{ color: '#8A8A9A' }}>
                  🧤 {t('predict.golden_glove_label')}
                </label>
                <input
                  type="text"
                  placeholder={t('predict.golden_glove_placeholder')}
                  value={prediction.goldenGlove}
                  onChange={e => setPrediction(prev => ({ ...prev, goldenGlove: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: '#111118', border: '1px solid #2A2A3A', color: '#F0F0F5' }}
                  onFocus={e => { e.target.style.borderColor = '#C9A84C'; }}
                  onBlur={e => { e.target.style.borderColor = '#2A2A3A'; }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStage('semiFinals')} className="btn-secondary px-6 py-3">
              ← Yarı Final
            </button>
            <button onClick={() => setStage('summary')} className="btn-primary px-6 py-3">
              {locale === 'en' ? 'Summary →' : 'Özete Geç →'}
            </button>
          </div>
        </div>
      )}

      {/* ===== SUMMARY ===== */}
      {stage === 'summary' && (
        <div>
          <h2 className="font-display text-3xl tracking-widest uppercase mb-6" style={{ color: '#C9A84C' }}>
            TAHMİN ÖZETİ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Champion */}
            <div className="card p-6 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, #1A1A24 100%)', borderColor: 'rgba(201,168,76,0.3)' }}>
              <div className="text-xs uppercase tracking-widest mb-3 font-mono-custom" style={{ color: '#8A8A9A' }}>
                {locale === 'en' ? '🏆 My Champion' : '🏆 Şampiyon Tahminin'}
              </div>
              {champion ? (
                <div className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={champion.flag} alt={champion.nameEn} style={{ width: '64px', height: '44px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div className="font-display text-3xl tracking-widest" style={{ color: '#C9A84C' }}>{champion.name}</div>
                </div>
              ) : (
                <p style={{ color: '#8A8A9A' }}>{locale === 'en' ? 'Not selected yet' : 'Henüz belirlenmedi'}</p>
              )}
            </div>

            {/* Awards */}
            <div className="card p-6">
              <div className="space-y-3">
                <div>
                  <div className="text-xs uppercase tracking-widest font-mono-custom mb-1" style={{ color: '#8A8A9A' }}>👟 Altın Ayakkabı</div>
                  <div className="font-semibold" style={{ color: '#F0F0F5' }}>{prediction.topScorer || '—'}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-mono-custom mb-1" style={{ color: '#8A8A9A' }}>🧤 Altın Eldiven</div>
                  <div className="font-semibold" style={{ color: '#F0F0F5' }}>{prediction.goldenGlove || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Group predictions summary */}
          <div className="card p-4 mb-6">
            <h3 className="font-display text-lg tracking-widest mb-3 uppercase" style={{ color: '#C9A84C' }}>
              {locale === 'en' ? 'Group Predictions' : 'Grup Tahminleri'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {GROUPS.map(group => {
                const pred = prediction.groups.find(g => g.groupId === group.id);
                const order = pred?.teamOrder || group.teams.map(t => t.slug);
                return (
                  <div key={group.id} className="text-sm">
                    <div className="font-display text-base mb-1" style={{ color: '#C9A84C' }}>GRUP {group.id}</div>
                    {order.slice(0, 2).map((slug, i) => {
                      const team = Object.values(TEAMS).find(t => t.slug === slug);
                      return (
                        <div key={slug} className="flex items-center gap-1 text-xs" style={{ color: '#F0F0F5' }}>
                          <span style={{ color: '#8A8A9A', width: '12px' }}>{i + 1}.</span>
                          {team && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={team.flag} alt="" style={{ width: '16px', height: '11px', borderRadius: '2px' }} />
                          )}
                          <span className="truncate">{team?.name || slug}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          <AdBanner slot="predict-summary" format="leaderboard" className="mb-6" />

          <div className="flex gap-3 flex-wrap justify-between">
            <button onClick={() => setStage('final')} className="btn-secondary px-6 py-3">
              ← Final
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setShowShareCard(true)}
                className="btn-secondary px-6 py-3"
              >
                📤 {t('predict.share_result')}
              </button>
              <button onClick={handleSave} className="btn-primary px-8 py-3 font-display tracking-widest text-xl">
                {saved ? '✓ KAYDEDİLDİ!' : t('predict.save_prediction')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset confirmation modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="card p-6 max-w-sm w-full text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="font-semibold mb-1" style={{ color: '#F0F0F5' }}>{t('predict.reset_confirm')}</p>
            <p className="text-sm mb-6" style={{ color: '#8A8A9A' }}>{locale === 'en' ? 'This action cannot be undone.' : 'Bu işlem geri alınamaz.'}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 btn-secondary py-2.5"
              >
                {t('predict.reset_no')}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-lg font-semibold transition-all"
                style={{ background: '#E63946', color: 'white' }}
              >
                {t('predict.reset_yes')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share card modal */}
      {showShareCard && (
        <ShareCard
          prediction={prediction}
          score={null}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
      {/* Score Modal */}
      {scoreModalData && (
        <ScoreModal
          matchId={scoreModalData.matchId}
          homeSlug={scoreModalData.homeSlug}
          awaySlug={scoreModalData.awaySlug}
          winnerSlug={scoreModalData.winnerSlug}
          initialScore={prediction.knockoutScores?.[scoreModalData.matchId]}
          onSave={updateScore}
          onClose={() => setScoreModalData(null)}
        />
      )}
  );
}

function KnockoutStage({
  title,
  matchups,
  results,
  onSelect,
  onNext,
  onPrev,
  nextLabel,
  knockoutScores,
  onSetScore,
}: {
  title: string;
  matchups: Array<{ matchId: string; home: string | null; away: string | null }>;
  results: KnockoutPrediction;
  onSelect: (matchId: string, winner: string) => void;
  onNext: () => void;
  onPrev: () => void;
  nextLabel: string;
  knockoutScores?: Record<string, { home: number; away: number }>;
  onSetScore?: (matchId: string, homeSlug: string | null, awaySlug: string | null, winnerSlug: string | null) => void;
}) {
  const completed = matchups.filter(m => results[m.matchId]).length;
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl md:text-3xl tracking-widest uppercase" style={{ color: '#C9A84C' }}>
          {title}
        </h2>
        <span className="text-sm font-mono-custom" style={{ color: '#8A8A9A' }}>
          {completed}/{matchups.length} seçildi
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {matchups.map((m) => (
          <KnockoutMatch
            key={m.matchId}
            matchId={m.matchId}
            homeSlug={m.home}
            awaySlug={m.away}
            winnerSlug={results[m.matchId] || null}
            onSelectWinner={onSelect}
            score={knockoutScores?.[m.matchId]}
            onSetScore={(matchId) => onSetScore?.(matchId, m.home, m.away, results[matchId] || null)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="btn-secondary px-6 py-3">
          ← Geri
        </button>
        <button onClick={onNext} className="btn-primary px-6 py-3">
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
