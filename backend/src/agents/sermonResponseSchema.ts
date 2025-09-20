import { z } from 'zod';

export const SermonSectionZ = z.object({
    id: z.string(),
    heading: z.string(),
    minutes: z.number(),
    content: z.string(),
});

export const VerseZ = z.object({
    ref: z.string(), // e.g. "John 3:16"
    text: z.string(), // drop this field if you went “refs-only”
});

export const SafetyZ = z.object({
    compliant: z.boolean(),
    checks: z.object({
        noHate: z.boolean(),
        noDehumanization: z.boolean(),
        noCollectiveBlame: z.boolean(),
        pastoralTone: z.boolean(),
        usesScriptureCharitably: z.boolean(),
    }),
    notes: z.string(),
});

export const SermonZ = z.object({
    title: z.string(),
    theme: z.string(),
    sections: z.array(SermonSectionZ).min(1),
    verses: z.array(VerseZ),
    pastoralNotes: z.string(),
    safety: SafetyZ,
});

export type SermonAgentResponse = z.infer<typeof SermonZ>;
