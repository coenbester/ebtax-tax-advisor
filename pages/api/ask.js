export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured. Add ANTHROPIC_API_KEY in Vercel environment variables.' });

  const { question } = req.body || {};
  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide a question.' });
  }
  if (question.length > 1000) {
    return res.status(400).json({ error: 'Question too long — please keep it under 1000 characters.' });
  }

  const systemPrompt = `You are a plain-language South African tax assistant for the ebTax website. Your knowledge comes from the PPS Fiduciary Services Tax Guide 2026/2027 (published 25 February 2026).

Answer questions clearly and practically for members of the public who are not tax experts. Use simple language. Where relevant, mention specific tax years, thresholds, and rates from the guide. Keep answers concise but complete. Do not recommend specific products or advisers by name. End with a brief note that complex situations should be discussed with a registered tax practitioner.

Key facts from the guide:
- Income tax thresholds 2026: under 65 = R95 750, 65-74 = R148 217, 75+ = R165 689
- Income tax thresholds 2027: under 65 = R99 000, 65-74 = R153 250, 75+ = R171 300
- Primary rebate 2026: R17 235; 2027: R17 820
- Medical credits 2027: R376/month main member and first dependant; R254/month each additional dependant
- Retirement deduction: lesser of R430 000 or 27.5% of income
- Tax-free investment annual limit: R46 000; lifetime limit R500 000
- CGT annual exclusion individuals: R50 000; primary residence exclusion up to R3 million gain
- CGT inclusion rates: individuals 40%, companies 80%, trusts 80%
- Donations tax: 20% after R150 000 individual annual exemption; 25% above R30 million
- Estate duty: 20% up to R30m dutiable estate, 25% above; basic abatement R3.5 million
- Company tax rate: 27%
- Trust tax rate: 45% on retained income (special trusts taxed at individual rates)
- VAT standard rate: 15%; compulsory registration threshold R2.3 million from 1 April 2026
- Single discretionary allowance: R2 million per calendar year
- Two-pot retirement system: in effect from 1 September 2024; savings pot taxed at marginal rate on withdrawal; retirement pot cannot be accessed before retirement
- Carbon tax: R308 per tCO2e from 1 January 2026
- Dividends tax: 20%
- Provisional tax threshold: R1.8 million from 1 March 2026
- Transfer duty: nil up to R1 210 000; sliding scale above`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: question.trim() }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const answer = data.content?.[0]?.text || 'No response received.';
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach Anthropic API. Please try again.' });
  }
}
