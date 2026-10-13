# Engine sound sources (v5)

Built from recordings kept outside the repo in `tools/audio/inbox/` (gitignored). The owner's recordings are from videos; licence not confirmed (private game for friends).

| Asset | Source | Built by |
|---|---|---|
| grains-on.wav | owner, `inbox/owner2/razgon.wav` (BMW M5 F90 acceleration), declicked | `tools/audio/build-grains.mjs` |
| idle-loop.wav | owner, `inbox/owner2/stage2-bmg.wav` 0.3-7.8 s (F90 idle), 5 s seamless loop at 750 rpm | `tools/audio/build-idle-loop.mjs` |
| squeal-0..2.wav | owner, `inbox/owner2/drift-by.wav` (drifting car), high-passed at 650 Hz to drop its engine, levelled | `tools/audio/build-squeal-driftby.mjs` |
| grains.js | own code | AudioWorklet synchronous-granular voice |

Pops are off (`manifest.pops` is empty) until new ones are made.
