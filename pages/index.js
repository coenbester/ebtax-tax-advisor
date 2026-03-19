import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tax Clarity | ebTax</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #ffffff; --bg2: #f7f6f3; --bg3: #f0efe9;
          --text: #1a1a18; --text2: #6b6b66; --text3: #9e9e99;
          --border: rgba(0,0,0,0.10); --border2: rgba(0,0,0,0.18);
          --accent: #1a4f8a; --accent-bg: #eaf1f9; --accent-text: #0f3561;
          --radius: 12px; --radius-sm: 8px;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #1c1c1a; --bg2: #252522; --bg3: #2e2e2b;
            --text: #f0efe9; --text2: #a0a09a; --text3: #6b6b66;
            --border: rgba(255,255,255,0.10); --border2: rgba(255,255,255,0.18);
            --accent: #4a8fd4; --accent-bg: #1a2d42; --accent-text: #a8cfee;
          }
        }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg3); color: var(--text); min-height: 100vh; font-size: 15px; line-height: 1.6; }
        .page { max-width: 860px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
        header { text-align: center; padding: 2.5rem 1rem 2rem; margin-bottom: 1.5rem; }
        .brand { font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
        header h1 { font-family: 'Instrument Serif', serif; font-size: clamp(30px, 5vw, 46px); font-weight: 400; color: var(--text); letter-spacing: -0.5px; line-height: 1.15; margin-bottom: 10px; }
        header p { font-size: 15px; color: var(--text2); max-width: 480px; margin: 0 auto 16px; font-weight: 300; }
        .year-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 14px; border-radius: 20px; background: var(--bg2); color: var(--text2); border: 0.5px solid var(--border); }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #3cb56a; display: inline-block; }
        .section-label { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text3); margin-bottom: 12px; }
        .topic-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-bottom: 2rem; }
        .topic-card { background: var(--bg); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 16px; cursor: pointer; transition: border-color 0.15s, background 0.15s, transform 0.1s; display: flex; flex-direction: column; gap: 8px; }
        .topic-card:hover { border-color: var(--border2); background: var(--bg2); transform: translateY(-1px); }
        .topic-card.active { border-color: var(--accent); background: var(--accent-bg); }
        .topic-icon { font-size: 20px; line-height: 1; }
        .topic-label { font-size: 13px; font-weight: 500; color: var(--text); line-height: 1.3; }
        .topic-card.active .topic-label { color: var(--accent-text); }
        .topic-desc { font-size: 11px; color: var(--text3); line-height: 1.4; }
        .calc-panel { background: var(--bg); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem; display: none; }
        .calc-panel.visible { display: block; }
        .calc-title { font-family: 'Instrument Serif', serif; font-size: 20px; font-weight: 400; color: var(--text); margin-bottom: 1.25rem; }
        .fields-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-bottom: 14px; }
        .field { display: flex; flex-direction: column; gap: 5px; }
        .field label { font-size: 12px; color: var(--text2); }
        .field input, .field select { font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 9px 12px; border-radius: var(--radius-sm); border: 0.5px solid var(--border2); background: var(--bg2); color: var(--text); outline: none; }
        .field input:focus, .field select:focus { border-color: var(--accent); background: var(--bg); }
        .result-strip { background: var(--bg2); border-radius: var(--radius-sm); padding: 14px 16px; margin-top: 14px; display: none; }
        .result-strip.visible { display: block; }
        .result-row { display: flex; justify-content: space-between; align-items: baseline; padding: 6px 0; border-bottom: 0.5px solid var(--border); font-size: 14px; }
        .result-row:last-child { border-bottom: none; }
        .result-row .lbl { color: var(--text2); }
        .result-row .val { font-weight: 500; color: var(--text); }
        .result-row.total { padding-top: 10px; margin-top: 4px; border-top: 0.5px solid var(--border2); border-bottom: none; }
        .result-row.total .lbl { font-weight: 500; color: var(--text); }
        .result-row.total .val { font-size: 20px; color: var(--accent); }
        .calc-note { font-size: 12px; color: var(--text3); margin-top: 10px; line-height: 1.5; }
        hr { border: none; border-top: 0.5px solid var(--border); margin: 2rem 0; }
        .ask-box { background: var(--bg); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.5rem; }
        .ask-inner { display: flex; gap: 10px; align-items: flex-end; }
        .ask-inner textarea { flex: 1; font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 12px 14px; border-radius: var(--radius-sm); border: 0.5px solid var(--border2); background: var(--bg2); color: var(--text); resize: none; min-height: 60px; outline: none; line-height: 1.5; }
        .ask-inner textarea:focus { border-color: var(--accent); background: var(--bg); }
        .ask-btn { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; padding: 12px 22px; border-radius: var(--radius-sm); border: none; background: var(--text); color: var(--bg); cursor: pointer; height: 60px; white-space: nowrap; }
        .ask-btn:hover { opacity: 0.8; }
        .ask-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .quick-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
        .chip { font-size: 12px; padding: 5px 13px; border-radius: 20px; border: 0.5px solid var(--border); background: var(--bg2); color: var(--text2); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; white-space: nowrap; }
        .chip:hover { border-color: var(--border2); color: var(--text); }
        .answer-panel { background: var(--bg); border: 0.5px solid var(--border); border-left: 3px solid var(--accent); border-radius: var(--radius); padding: 1.25rem 1.5rem; margin-top: 1rem; display: none; }
        .answer-panel.visible { display: block; }
        .answer-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
        .answer-body { font-size: 14px; color: var(--text); line-height: 1.75; white-space: pre-wrap; }
        .typing-indicator { display: inline-flex; gap: 4px; align-items: center; }
        .typing-indicator span { width: 6px; height: 6px; border-radius: 50%; background: var(--text3); animation: bounce 1.2s infinite; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 80%, 100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-5px); opacity: 1; } }
        footer { text-align: center; font-size: 12px; color: var(--text3); margin-top: 3rem; padding-top: 1.5rem; border-top: 0.5px solid var(--border); line-height: 1.7; }
        @media (max-width: 500px) { .topic-grid { grid-template-columns: repeat(2, 1fr); } .ask-inner { flex-direction: column; } .ask-btn { width: 100%; height: 44px; } }
      `}</style>

      <div className="page">
        <header>
          <div className="brand">ebTax</div>
          <h1>Tax Clarity</h1>
          <p>Plain-language tax answers and estimates based on the latest South African tax rules</p>
          <div className="year-pill"><span className="dot"></span> Tax years 2026 &amp; 2027 · South Africa</div>
        </header>

        <div className="section-label">Calculate by topic</div>
        <div className="topic-grid">
          <div className="topic-card" onClick={() => setTopic('income')}><span className="topic-icon">📊</span><span className="topic-label">Income tax</span><span className="topic-desc">Estimate your annual tax bill</span></div>
          <div className="topic-card" onClick={() => setTopic('medical')}><span className="topic-icon">🏥</span><span className="topic-label">Medical credits</span><span className="topic-desc">Monthly &amp; annual credits</span></div>
          <div className="topic-card" onClick={() => setTopic('retirement')}><span className="topic-icon">🏦</span><span className="topic-label">Retirement</span><span className="topic-desc">Max deduction allowed</span></div>
          <div className="topic-card" onClick={() => setTopic('cgt')}><span className="topic-icon">📈</span><span className="topic-label">Capital gains</span><span className="topic-desc">CGT on asset disposals</span></div>
          <div className="topic-card" onClick={() => setTopic('travel')}><span className="topic-icon">🚗</span><span className="topic-label">Travel allowance</span><span className="topic-desc">Deductible travel costs</span></div>
          <div className="topic-card" onClick={() => setTopic('donations')}><span className="topic-icon">🎁</span><span className="topic-label">Donations tax</span><span className="topic-desc">Tax on gifts &amp; donations</span></div>
          <div className="topic-card" onClick={() => setTopic('estate')}><span className="topic-icon">🏠</span><span className="topic-label">Estate duty</span><span className="topic-desc">Tax on deceased estates</span></div>
          <div className="topic-card" onClick={() => setTopic('vat')}><span className="topic-icon">🧾</span><span className="topic-label">VAT</span><span className="topic-desc">Add or remove 15% VAT</span></div>
        </div>

        <div id="calc-income" className="calc-panel">
          <div className="calc-title">Income tax estimator</div>
          <div className="fields-grid">
            <div className="field"><label>Tax year</label><select id="inc-year" onChange={() => calcIncome()}><option value="2026">2026</option><option value="2027">2027</option></select></div>
            <div className="field"><label>Age group</label><select id="inc-age" onChange={() => calcIncome()}><option value="under65">Under 65</option><option value="65to74">65 to 74</option><option value="75plus">75 and over</option></select></div>
            <div className="field"><label>Annual taxable income (R)</label><input type="number" id="inc-amount" placeholder="e.g. 450 000" onInput={() => calcIncome()} /></div>
            <div className="field"><label>Total people on medical aid</label><input type="number" id="inc-med" placeholder="e.g. 3" min="0" onInput={() => calcIncome()} /></div>
          </div>
          <div id="income-result" className="result-strip">
            <div className="result-row"><span className="lbl">Gross income tax</span><span className="val" id="r-gross"></span></div>
            <div className="result-row"><span className="lbl">Less: primary rebate</span><span className="val" id="r-rebate"></span></div>
            <div className="result-row"><span className="lbl">Less: medical aid credit</span><span className="val" id="r-med"></span></div>
            <div className="result-row total"><span className="lbl">Estimated tax payable</span><span className="val" id="r-total"></span></div>
            <div className="result-row"><span className="lbl">Effective rate</span><span className="val" id="r-eff"></span></div>
            <div className="result-row"><span className="lbl">Monthly PAYE</span><span className="val" id="r-monthly"></span></div>
          </div>
          <p className="calc-note">Estimate based on published tax tables. Does not account for all deductions or individual circumstances.</p>
        </div>

        <div id="calc-medical" className="calc-panel">
          <div className="calc-title">Medical aid tax credits</div>
          <div className="fields-grid">
            <div className="field"><label>Tax year</label><select id="med-year" onChange={() => calcMedical()}><option value="2026">2026</option><option value="2027">2027</option></select></div>
            <div className="field"><label>Total people on medical aid</label><input type="number" id="med-members" placeholder="e.g. 3" min="1" onInput={() => calcMedical()} /></div>
          </div>
          <div id="medical-result" className="result-strip">
            <div className="result-row"><span className="lbl">Main member credit (monthly)</span><span className="val" id="med-main"></span></div>
            <div className="result-row"><span className="lbl">Additional dependants (monthly)</span><span className="val" id="med-add"></span></div>
            <div className="result-row"><span className="lbl">Total monthly credit</span><span className="val" id="med-monthly"></span></div>
            <div className="result-row total"><span className="lbl">Total annual credit</span><span className="val" id="med-annual"></span></div>
          </div>
          <p className="calc-note">2027: R376/month main member and first dependant; R254/month each additional dependant.</p>
        </div>

        <div id="calc-retirement" className="calc-panel">
          <div className="calc-title">Retirement fund deduction</div>
          <div className="fields-grid">
            <div className="field"><label>Annual taxable income (R)</label><input type="number" id="ret-income" placeholder="e.g. 600 000" onInput={() => calcRetirement()} /></div>
            <div className="field"><label>Annual retirement contributions (R)</label><input type="number" id="ret-contrib" placeholder="e.g. 80 000" onInput={() => calcRetirement()} /></div>
          </div>
          <div id="retirement-result" className="result-strip">
            <div className="result-row"><span className="lbl">27.5% of income</span><span className="val" id="ret-pct"></span></div>
            <div className="result-row"><span className="lbl">Annual rand cap</span><span className="val">R430 000</span></div>
            <div className="result-row"><span className="lbl">Maximum allowable deduction</span><span className="val" id="ret-max"></span></div>
            <div className="result-row total"><span className="lbl">Your deductible amount</span><span className="val" id="ret-deduct"></span></div>
            <div className="result-row"><span className="lbl">Excess carried forward</span><span className="val" id="ret-excess"></span></div>
          </div>
          <p className="calc-note">Deduction is the lesser of R430 000 or 27.5% of income. Excess rolls over to the next tax year.</p>
        </div>

        <div id="calc-cgt" className="calc-panel">
          <div className="calc-title">Capital gains tax estimate</div>
          <div className="fields-grid">
            <div className="field"><label>Taxpayer type</label><select id="cgt-type" onChange={() => calcCGT()}><option value="individual">Individual</option><option value="company">Company</option><option value="trust">Trust</option></select></div>
            <div className="field"><label>Primary residence?</label><select id="cgt-primary" onChange={() => calcCGT()}><option value="no">No</option><option value="yes">Yes</option></select></div>
            <div className="field"><label>Capital gain (R)</label><input type="number" id="cgt-gain" placeholder="e.g. 500 000" onInput={() => calcCGT()} /></div>
            <div className="field"><label>Your marginal tax rate % (individuals)</label><input type="number" id="cgt-rate" placeholder="e.g. 41" min="0" max="45" onInput={() => calcCGT()} /></div>
          </div>
          <div id="cgt-result" className="result-strip">
            <div className="result-row"><span className="lbl">Exclusion applied</span><span className="val" id="cg-excl"></span></div>
            <div className="result-row"><span className="lbl">Net capital gain</span><span className="val" id="cg-net"></span></div>
            <div className="result-row"><span className="lbl">Inclusion rate</span><span className="val" id="cg-inc-rate"></span></div>
            <div className="result-row"><span className="lbl">Taxable portion</span><span className="val" id="cg-taxable"></span></div>
            <div className="result-row total"><span className="lbl">Approximate CGT</span><span className="val" id="cg-total"></span></div>
          </div>
          <p className="calc-note">Annual exclusion R50 000. Primary residence exclusion up to R3 million. Inclusion rates: individuals 40%, companies and trusts 80%.</p>
        </div>

        <div id="calc-travel" className="calc-panel">
          <div className="calc-title">Travel allowance deduction</div>
          <div className="fields-grid">
            <div className="field"><label>Tax year</label><select id="tv-year" onChange={() => calcTravel()}><option value="2026">2026</option><option value="2027">2027</option></select></div>
            <div className="field"><label>Vehicle cost incl. VAT (R)</label><input type="number" id="tv-cost" placeholder="e.g. 350 000" onInput={() => calcTravel()} /></div>
            <div className="field"><label>Business kilometres</label><input type="number" id="tv-biz" placeholder="e.g. 15 000" onInput={() => calcTravel()} /></div>
            <div className="field"><label>Total kilometres driven</label><input type="number" id="tv-total" placeholder="e.g. 25 000" onInput={() => calcTravel()} /></div>
          </div>
          <div id="travel-result" className="result-strip">
            <div className="result-row"><span className="lbl">Deemed annual fixed cost</span><span className="val" id="tv-fixed"></span></div>
            <div className="result-row"><span className="lbl">Business-use percentage</span><span className="val" id="tv-pct"></span></div>
            <div className="result-row total"><span className="lbl">Estimated deductible amount</span><span className="val" id="tv-deduct"></span></div>
          </div>
          <p className="calc-note">Based on deemed expenditure tables. A detailed logbook is required.</p>
        </div>

        <div id="calc-donations" className="calc-panel">
          <div className="calc-title">Donations tax estimate</div>
          <div className="fields-grid">
            <div className="field"><label>Donor type</label><select id="don-type" onChange={() => calcDonations()}><option value="individual">Individual</option><option value="company">Company (non-public)</option></select></div>
            <div className="field"><label>Total donations this year (R)</label><input type="number" id="don-amount" placeholder="e.g. 200 000" onInput={() => calcDonations()} /></div>
          </div>
          <div id="donations-result" className="result-strip">
            <div className="result-row"><span className="lbl">Annual exemption</span><span className="val" id="dn-exempt"></span></div>
            <div className="result-row"><span className="lbl">Taxable donations</span><span className="val" id="dn-taxable"></span></div>
            <div className="result-row total"><span className="lbl">Donations tax payable</span><span className="val" id="dn-tax"></span></div>
          </div>
          <p className="calc-note">20% on taxable donations up to R30 million; 25% above. Donations between spouses and to approved PBOs are exempt.</p>
        </div>

        <div id="calc-estate" className="calc-panel">
          <div className="calc-title">Estate duty estimate</div>
          <div className="fields-grid">
            <div className="field"><label>Gross estate value (R)</label><input type="number" id="est-value" placeholder="e.g. 8 000 000" onInput={() => calcEstate()} /></div>
            <div className="field"><label>Bequest to surviving spouse (R)</label><input type="number" id="est-spouse" placeholder="e.g. 2 000 000" onInput={() => calcEstate()} /></div>
          </div>
          <div id="estate-result" className="result-strip">
            <div className="result-row"><span className="lbl">Basic abatement</span><span className="val">R3 500 000</span></div>
            <div className="result-row"><span className="lbl">Spouse bequest deduction</span><span className="val" id="est-spouse-d"></span></div>
            <div className="result-row"><span className="lbl">Dutiable estate</span><span className="val" id="est-dutiable"></span></div>
            <div className="result-row total"><span className="lbl">Estimated estate duty</span><span className="val" id="est-duty"></span></div>
          </div>
          <p className="calc-note">20% on first R30 million; 25% above. Bequests to a surviving spouse are fully deductible.</p>
        </div>

        <div id="calc-vat" className="calc-panel">
          <div className="calc-title">VAT calculator</div>
          <div className="fields-grid">
            <div className="field"><label>Direction</label><select id="vat-dir" onChange={() => calcVAT()}><option value="add">Add VAT — I have the excl. price</option><option value="remove">Remove VAT — I have the incl. price</option></select></div>
            <div className="field"><label>Amount (R)</label><input type="number" id="vat-amount" placeholder="e.g. 10 000" onInput={() => calcVAT()} /></div>
          </div>
          <div id="vat-result" className="result-strip">
            <div className="result-row"><span className="lbl">Excl. VAT</span><span className="val" id="vat-excl"></span></div>
            <div className="result-row"><span className="lbl">VAT at 15%</span><span className="val" id="vat-vatamt"></span></div>
            <div className="result-row total"><span className="lbl">Incl. VAT</span><span className="val" id="vat-incl"></span></div>
          </div>
          <p className="calc-note">Standard VAT rate is 15%. Some goods and services are zero-rated or exempt.</p>
        </div>

        <hr />

        <div className="section-label">Ask a tax question</div>
        <div className="ask-box">
          <div className="ask-inner">
            <textarea id="ask-input" placeholder="e.g. Do I pay tax on rental income? How does the two-pot system work?" rows="2" onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitQuestion(); } }}></textarea>
            <button className="ask-btn" id="ask-btn" onClick={() => submitQuestion()}>Ask ↗</button>
          </div>
          <div className="quick-chips">
            <span className="chip" onClick={() => setQ('What are the income tax thresholds for 2026?')}>Tax thresholds 2026</span>
            <span className="chip" onClick={() => setQ('How does the two-pot retirement system work?')}>Two-pot system</span>
            <span className="chip" onClick={() => setQ('When do I need to register for VAT?')}>VAT registration</span>
            <span className="chip" onClick={() => setQ('What is the CGT exclusion on my primary residence?')}>CGT home exclusion</span>
            <span className="chip" onClick={() => setQ('How much can I put into a tax-free savings account per year?')}>Tax-free savings</span>
            <span className="chip" onClick={() => setQ('Can a trust save me tax?')}>Trusts and tax</span>
            <span className="chip" onClick={() => setQ('What is provisional tax and do I need to pay it?')}>Provisional tax</span>
            <span className="chip" onClick={() => setQ('What are the estate duty rates and exemptions?')}>Estate duty</span>
          </div>
          <div className="answer-panel" id="answer-panel">
            <div className="answer-label">Tax Clarity Answer</div>
            <div className="answer-body" id="answer-body"></div>
          </div>
        </div>

        <footer>
          <p>Based on the South African Tax Guide 2026/2027, published 25 February 2026.</p>
          <p style={{marginTop:'6px'}}>General guidance only — not professional tax advice. Consult a registered tax practitioner for advice specific to your situation.</p>
          <p style={{marginTop:'10px', color:'var(--accent)'}}>ebTax · Tax made clear</p>
        </footer>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const fmt = n => 'R\u00a0' + Math.round(n).toLocaleString('en-ZA');
        const pct = n => n.toFixed(1) + '%';

        function setTopic(id) {
          document.querySelectorAll('.topic-card').forEach(c => c.classList.remove('active'));
          document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('visible'));
          event.currentTarget.classList.add('active');
          const panel = document.getElementById('calc-' + id);
          if (panel) { panel.classList.add('visible'); panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
        }

        function calcIncome() {
          const yr = document.getElementById('inc-year').value;
          const income = parseFloat(document.getElementById('inc-amount').value) || 0;
          const age = document.getElementById('inc-age').value;
          const meds = parseInt(document.getElementById('inc-med').value) || 0;
          if (income <= 0) { document.getElementById('income-result').classList.remove('visible'); return; }
          const b26 = [[237100,0.18,0],[370500,0.26,42678],[512800,0.31,77362],[673000,0.36,121475],[857900,0.39,179147],[1817000,0.41,251258],[Infinity,0.45,644489]];
          const b27 = [[245100,0.18,0],[383100,0.26,44118],[530200,0.31,79998],[695800,0.36,125599],[887000,0.39,185215],[1878600,0.41,259783],[Infinity,0.45,666339]];
          const brackets = yr === '2026' ? b26 : b27;
          let gross = 0;
          for (let i = 0; i < brackets.length; i++) {
            const [top, rate, base] = brackets[i];
            const prev = i === 0 ? 0 : brackets[i-1][0];
            if (income <= top) { gross = base + (income - prev) * rate; break; }
          }
          const reb26 = {under65:17235,'65to74':26679,'75plus':29824};
          const reb27 = {under65:17820,'65to74':27585,'75plus':30834};
          const rebate = (yr === '2026' ? reb26 : reb27)[age];
          const mr = yr === '2026' ? {main:364,add:246} : {main:376,add:254};
          let medCredit = 0;
          if (meds >= 1) medCredit += mr.main * 12;
          if (meds >= 2) medCredit += mr.main * 12;
          if (meds >= 3) medCredit += mr.add * (meds - 2) * 12;
          const net = Math.max(0, gross - rebate - medCredit);
          document.getElementById('r-gross').textContent = fmt(gross);
          document.getElementById('r-rebate').textContent = '- ' + fmt(rebate);
          document.getElementById('r-med').textContent = '- ' + fmt(medCredit);
          document.getElementById('r-total').textContent = fmt(net);
          document.getElementById('r-eff').textContent = pct(net / income * 100);
          document.getElementById('r-monthly').textContent = fmt(net / 12);
          document.getElementById('income-result').classList.add('visible');
        }

        function calcMedical() {
          const yr = document.getElementById('med-year').value;
          const m = parseInt(document.getElementById('med-members').value) || 0;
          if (m <= 0) { document.getElementById('medical-result').classList.remove('visible'); return; }
          const r = yr === '2026' ? {main:364,add:246} : {main:376,add:254};
          const mainC = Math.min(m, 2) * r.main;
          const addC = Math.max(0, m - 2) * r.add;
          const monthly = mainC + addC;
          document.getElementById('med-main').textContent = fmt(mainC);
          document.getElementById('med-add').textContent = fmt(addC);
          document.getElementById('med-monthly').textContent = fmt(monthly);
          document.getElementById('med-annual').textContent = fmt(monthly * 12);
          document.getElementById('medical-result').classList.add('visible');
        }

        function calcRetirement() {
          const income = parseFloat(document.getElementById('ret-income').value) || 0;
          const contrib = parseFloat(document.getElementById('ret-contrib').value) || 0;
          if (income <= 0) { document.getElementById('retirement-result').classList.remove('visible'); return; }
          const pctLim = income * 0.275;
          const maxAllow = Math.min(pctLim, 430000, income);
          const deduct = Math.min(contrib, maxAllow);
          const excess = Math.max(0, contrib - maxAllow);
          document.getElementById('ret-pct').textContent = fmt(pctLim);
          document.getElementById('ret-max').textContent = fmt(maxAllow);
          document.getElementById('ret-deduct').textContent = fmt(deduct);
          document.getElementById('ret-excess').textContent = fmt(excess);
          document.getElementById('retirement-result').classList.add('visible');
        }

        function calcCGT() {
          const type = document.getElementById('cgt-type').value;
          const gain = parseFloat(document.getElementById('cgt-gain').value) || 0;
          const primary = document.getElementById('cgt-primary').value;
          const marginal = (parseFloat(document.getElementById('cgt-rate').value) || 45) / 100;
          if (gain <= 0) { document.getElementById('cgt-result').classList.remove('visible'); return; }
          let excl = 0, incRate = 0, taxRate = 0, exclLabel = '';
          if (type === 'individual') {
            if (primary === 'yes') { excl = Math.min(gain, 3000000); exclLabel = 'Primary residence (up to R3m)'; }
            else { excl = 50000; exclLabel = 'Annual exclusion (R50 000)'; }
            incRate = 0.40; taxRate = marginal;
          } else if (type === 'company') { excl = 0; exclLabel = 'None'; incRate = 0.80; taxRate = 0.27; }
          else { excl = 0; exclLabel = 'None'; incRate = 0.80; taxRate = 0.45; }
          const netGain = Math.max(0, gain - excl);
          const taxable = netGain * incRate;
          document.getElementById('cg-excl').textContent = fmt(excl) + ' - ' + exclLabel;
          document.getElementById('cg-net').textContent = fmt(netGain);
          document.getElementById('cg-inc-rate').textContent = pct(incRate * 100);
          document.getElementById('cg-taxable').textContent = fmt(taxable);
          document.getElementById('cg-total').textContent = fmt(taxable * taxRate);
          document.getElementById('cgt-result').classList.add('visible');
        }

        function calcTravel() {
          const yr = document.getElementById('tv-year').value;
          const cost = parseFloat(document.getElementById('tv-cost').value) || 0;
          const biz = parseFloat(document.getElementById('tv-biz').value) || 0;
          const total = parseFloat(document.getElementById('tv-total').value) || 0;
          if (cost <= 0 || biz <= 0 || total <= 0) { document.getElementById('travel-result').classList.remove('visible'); return; }
          const t26 = [[100000,33940],[200000,60688],[300000,87497],[400000,111273],[500000,135048],[600000,159934],[700000,184867],[Infinity,211121]];
          const t27 = [[115000,38344],[230000,68487],[345000,98689],[460000,125393],[575000,152097],[690000,180078],[805000,208106],[Infinity,237679]];
          const table = yr === '2026' ? t26 : t27;
          let fixed = 0;
          for (const [lim, val] of table) { if (cost <= lim) { fixed = val; break; } }
          const bizPct = Math.min(biz / total, 1);
          document.getElementById('tv-fixed').textContent = fmt(fixed);
          document.getElementById('tv-pct').textContent = pct(bizPct * 100);
          document.getElementById('tv-deduct').textContent = fmt(fixed * bizPct);
          document.getElementById('travel-result').classList.add('visible');
        }

        function calcDonations() {
          const amount = parseFloat(document.getElementById('don-amount').value) || 0;
          const type = document.getElementById('don-type').value;
          if (amount <= 0) { document.getElementById('donations-result').classList.remove('visible'); return; }
          const exempt = type === 'individual' ? 150000 : 20000;
          const taxable = Math.max(0, amount - exempt);
          const tax = taxable <= 30000000 ? taxable * 0.20 : 30000000 * 0.20 + (taxable - 30000000) * 0.25;
          document.getElementById('dn-exempt').textContent = fmt(exempt);
          document.getElementById('dn-taxable').textContent = fmt(taxable);
          document.getElementById('dn-tax').textContent = fmt(tax);
          document.getElementById('donations-result').classList.add('visible');
        }

        function calcEstate() {
          const value = parseFloat(document.getElementById('est-value').value) || 0;
          const spouse = parseFloat(document.getElementById('est-spouse').value) || 0;
          if (value <= 0) { document.getElementById('estate-result').classList.remove('visible'); return; }
          const dutiable = Math.max(0, value - 3500000 - spouse);
          const duty = dutiable <= 30000000 ? dutiable * 0.20 : 30000000 * 0.20 + (dutiable - 30000000) * 0.25;
          document.getElementById('est-spouse-d').textContent = fmt(spouse);
          document.getElementById('est-dutiable').textContent = fmt(dutiable);
          document.getElementById('est-duty').textContent = fmt(duty);
          document.getElementById('estate-result').classList.add('visible');
        }

        function calcVAT() {
          const dir = document.getElementById('vat-dir').value;
          const amount = parseFloat(document.getElementById('vat-amount').value) || 0;
          if (amount <= 0) { document.getElementById('vat-result').classList.remove('visible'); return; }
          let excl, vatAmt, incl;
          if (dir === 'add') { excl = amount; vatAmt = amount * 0.15; incl = amount + vatAmt; }
          else { incl = amount; vatAmt = amount * 15 / 115; excl = amount - vatAmt; }
          document.getElementById('vat-excl').textContent = fmt(excl);
          document.getElementById('vat-vatamt').textContent = fmt(vatAmt);
          document.getElementById('vat-incl').textContent = fmt(incl);
          document.getElementById('vat-result').classList.add('visible');
        }

        function setQ(q) { document.getElementById('ask-input').value = q; submitQuestion(); }

        async function submitQuestion() {
          const q = document.getElementById('ask-input').value.trim();
          if (!q) return;
          const btn = document.getElementById('ask-btn');
          btn.disabled = true; btn.textContent = '...';
          const panel = document.getElementById('answer-panel');
          const body = document.getElementById('answer-body');
          panel.classList.add('visible');
          body.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
          try {
            const res = await fetch('/api/ask', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: q })
            });
            const data = await res.json();
            body.textContent = data.answer || data.error || 'No response received.';
          } catch (err) {
            body.textContent = 'Could not reach the server. Please try again.';
          }
          btn.disabled = false; btn.textContent = 'Ask \u2197';
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      `}} />
    </>
  );
}
