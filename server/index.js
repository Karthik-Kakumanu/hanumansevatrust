import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'

const app = express()
const port = Number(process.env.PORT || 8787)
const origins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map(x => x.trim()).filter(Boolean)
app.use(cors({ origin: (origin, cb) => !origin || origins.includes(origin) ? cb(null, true) : cb(new Error('Origin not allowed')) }))
app.use(express.json({ limit: '32kb' }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 80, standardHeaders: true, legacyHeaders: false }))
app.use((err, _req, res, next) => { if (err?.type === 'entity.parse.failed') return res.status(400).json({ ok: false, error: 'Invalid JSON request.' }); next(err) })

const contactSchema = z.object({ name: z.string().trim().min(2).max(120), phone: z.string().trim().min(7).max(30), email: z.string().email().max(180), message: z.string().trim().min(5).max(4000), website: z.string().max(0).optional() })
const donationSchema = z.object({ name: z.string().trim().min(2).max(120), phone: z.string().trim().min(7).max(30), email: z.string().email().max(180), amount: z.coerce.number().finite().positive().max(10000000), purpose: z.string().trim().min(2).max(120), address: z.string().trim().max(1000).optional(), website: z.string().max(0).optional() })

function safeResult(schema, req, res, kind) {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Please check the highlighted fields and try again.' })
  if (parsed.data.website) return res.status(400).json({ ok: false, error: 'Request rejected.' })
  if (!process.env.TRUST_NOTIFICATION_EMAIL) return res.status(503).json({ ok: false, error: `${kind} service is not configured yet. Please contact the trust directly.` })
  // Delivery is intentionally gated: add Resend/provider wiring only after credentials are configured.
  return res.status(503).json({ ok: false, error: `${kind} service is awaiting secure email-provider configuration.` })
}
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'jai-hanuman-seva-trust' }))
app.post('/api/contact', (req, res) => safeResult(contactSchema, req, res, 'Contact'))
app.post('/api/donations', (req, res) => safeResult(donationSchema, req, res, 'Donation'))
app.use((_req, res) => res.status(404).json({ ok: false, error: 'Not found' }))
app.listen(port, () => console.log(`Jai Hanuman API listening on ${port}`))
