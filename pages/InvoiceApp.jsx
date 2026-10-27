import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import styles from './index.module.css'

const currencies = ['USD', 'EUR', 'GBP', 'NGN']
const today = new Date().toISOString().slice(0, 10)

function createInvoice(id = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`) {
  const date = new Date()
  const due = new Date(date)
  due.setDate(date.getDate() + 14)
  return {
    id,
    status: 'Draft',
    issueDate: today,
    dueDate: due.toISOString().slice(0, 10),
    currency: 'USD',
    client: '',
    email: '',
    address: '',
    notes: 'Thank you for your business.',
    tax: 0,
    items: [{ id: Date.now(), description: 'Design services', quantity: 1, rate: 850 }],
  }
}

function money(value, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value || 0)
}

function dateLabel(value) {
  if (!value) return '—'
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function InvoiceApp() {
  const [invoice, setInvoice] = useState(() => createInvoice('INV-2026-0001'))
  const [invoices, setInvoices] = useState([])
  const [activeView, setActiveView] = useState('editor')
  const [notice, setNotice] = useState('')
  const [authUser, setAuthUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ledger-invoices')
      if (saved) setInvoices(JSON.parse(saved))
      const savedUser = window.localStorage.getItem('ledger-account')
      if (savedUser) setAuthUser(JSON.parse(savedUser))
    } catch {
      setInvoices([])
      window.localStorage.removeItem('ledger-account')
    }
    setAuthReady(true)
  }, [])

  const subtotal = useMemo(() => invoice.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0), 0), [invoice.items])
  const taxAmount = subtotal * Number(invoice.tax || 0) / 100
  const total = subtotal + taxAmount
  const paidTotal = invoices.filter((item) => item.status === 'Paid').reduce((sum, item) => sum + Number(item.total || 0), 0)
  const outstandingTotal = invoices.filter((item) => item.status !== 'Paid').reduce((sum, item) => sum + Number(item.total || 0), 0)

  function update(field, value) {
    setInvoice((current) => ({ ...current, [field]: value }))
  }

  function updateItem(id, field, value) {
    setInvoice((current) => ({ ...current, items: current.items.map((item) => item.id === id ? { ...item, [field]: value } : item) }))
  }

  function save(status = invoice.status) {
    const record = { ...invoice, status, total }
    const next = [record, ...invoices.filter((item) => item.id !== invoice.id)]
    setInvoices(next)
    window.localStorage.setItem('ledger-invoices', JSON.stringify(next))
    setInvoice(record)
    setNotice(status === 'Sent' ? 'Invoice marked as sent' : 'Draft saved')
    window.setTimeout(() => setNotice(''), 2400)
  }

  function openInvoice(record) {
    setInvoice({ ...record, items: record.items || [] })
    setActiveView('editor')
  }

  function markPaid(record) {
    const next = invoices.map((item) => item.id === record.id ? { ...item, status: 'Paid' } : item)
    setInvoices(next)
    window.localStorage.setItem('ledger-invoices', JSON.stringify(next))
  }

  function startNew() {
    setInvoice(createInvoice())
    setActiveView('editor')
  }

  function signIn(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email')).trim().toLowerCase()
    const name = email.split('@')[0].split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    const user = { email, name: name || 'Account' }
    window.localStorage.setItem('ledger-account', JSON.stringify(user))
    setAuthUser(user)
    setLoginError('')
  }

  function signOut() {
    window.localStorage.removeItem('ledger-account')
    setAuthUser(null)
    setAccountOpen(false)
  }

  if (!authReady) return <div className={styles.invoiceApp}><Head><title>Titus Ledger | Sign in</title></Head></div>

  if (!authUser) return <div className={styles.invoiceApp}>
    <Head><title>Sign in | Titus Ledger</title><meta name="description" content="Sign in to your Titus Ledger invoice workspace." /></Head>
    <main className={styles.authScreen}>
      <a className={styles.invoiceBrand} href="#signin"><span className={styles.brandMark}>TL</span><span>Titus Ledger<span className={styles.brandDot}>.</span></span></a>
      <section className={styles.authPanel}>
        <p className={styles.overline}>YOUR BILLING WORKSPACE</p>
        <h1>Welcome back.</h1>
        <p className={styles.authIntro}>Sign in to manage your invoices and client details.</p>
        <form className={styles.authForm} onSubmit={signIn}>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@studio.com" required /></label>
          <label>Password<input name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required minLength="4" /></label>
          {loginError && <p className={styles.authError} role="alert">{loginError}</p>}
          <button className={styles.buttonPrimary} type="submit">Sign in <span>→</span></button>
        </form>
        <p className={styles.authDisclaimer}>Local demo sign-in. Credentials are not sent to a server.</p>
      </section>
      <p className={styles.authFooter}>TITUS LEDGER <span>·</span> SIMPLE BILLING, BEAUTIFULLY HANDLED</p>
    </main>
  </div>

  return <div className={styles.invoiceApp}>
    <Head>
      <title>Titus Ledger | Invoices</title>
      <meta name="description" content="Create, manage, and print professional invoices." />
    </Head>
    <aside className={styles.sidebar}>
      <a className={styles.invoiceBrand} href="#workspace"><span className={styles.brandMark}>TL</span><span>Titus Ledger<span className={styles.brandDot}>.</span></span></a>
      <div className={styles.workspaceLabel}>WORKSPACE</div>
      <nav className={styles.sideNav} aria-label="Workspace">
        <button className={activeView === 'editor' ? styles.navActive : ''} onClick={() => setActiveView('editor')}><span>▤</span> Invoices <b>{invoices.length}</b></button>
        <button className={activeView === 'clients' ? styles.navActive : ''} onClick={() => setActiveView('clients')}><span>♙</span> Clients</button>
      </nav>
      <div className={styles.sideBottom}><div className={styles.avatar}>{authUser.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div><div><strong>{authUser.name}</strong><small>{authUser.email}</small></div><button aria-label="Account options" aria-expanded={accountOpen} onClick={() => setAccountOpen(!accountOpen)}>···</button>{accountOpen && <div className={styles.accountMenu}><strong>{authUser.email}</strong><button onClick={signOut}>↪ <span>Log out</span></button></div>}</div>
    </aside>

    <main className={styles.invoiceMain} id="workspace">
      <header className={styles.topbar}><div className={styles.breadcrumb}>Workspace <span>/</span> <b>{activeView === 'editor' ? 'Invoices' : 'Clients'}</b></div><div className={styles.topbarRight}><span className={styles.syncStatus}><i /> All changes saved</span><button className={styles.helpButton} aria-label="Help">?</button></div></header>
      {activeView === 'clients' ? <section className={styles.emptyClients}><div className={styles.emptyIcon}>♙</div><p className={styles.overline}>CLIENT DIRECTORY</p><h1>Your clients live in your invoices.</h1><p>Client details appear here as you create invoices. Start with a new invoice to add your first client.</p><button className={styles.buttonPrimary} onClick={startNew}>＋ New invoice</button></section> : <>
        <section className={styles.pageHeading}><div><p className={styles.overline}>MONDAY, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</p><h1>Invoices<span className={styles.headingCount}>{invoices.length}</span></h1><p className={styles.headingSub}>Create and keep track of your client billing.</p></div><button className={styles.buttonPrimary} onClick={startNew}><span>＋</span> New invoice</button></section>

        <section className={styles.statStrip} aria-label="Invoice summary">
          <div><span>OUTSTANDING</span><strong>{money(outstandingTotal, 'USD')}</strong><small>{invoices.filter((item) => item.status !== 'Paid').length} invoices</small></div>
          <div><span>PAID THIS YEAR</span><strong>{money(paidTotal, 'USD')}</strong><small>{invoices.filter((item) => item.status === 'Paid').length} invoices</small></div>
          <div><span>ALL INVOICES</span><strong>{String(invoices.length).padStart(2, '0')}</strong><small>Across all clients</small></div>
        </section>

        <div className={styles.contentGrid}>
          <section className={styles.editorColumn}>
            <div className={styles.sectionTitle}><div><p className={styles.overline}>INVOICE EDITOR</p><h2>{invoice.id}</h2></div><span className={`${styles.statusBadge} ${invoice.status === 'Sent' ? styles.statusSent : ''}`}>{invoice.status}</span></div>
            <div className={styles.editorPanel}>
              <div className={styles.formSection}><div className={styles.formHeading}><span>01</span><h3>From your business</h3></div><div className={styles.businessBlock}><div className={styles.businessMark}>JD</div><div><strong>Jordan Davis Studio</strong><p>hello@jordandavis.studio<br />Brooklyn, NY 11211</p></div><button className={styles.textButton}>Edit details</button></div></div>

              <div className={styles.formSection}><div className={styles.formHeading}><span>02</span><h3>Bill to</h3></div><div className={styles.formGrid}><label className={styles.fullField}>Client or company<input value={invoice.client} onChange={(event) => update('client', event.target.value)} placeholder="e.g. Acme Studio" /></label><label>Email address<input type="email" value={invoice.email} onChange={(event) => update('email', event.target.value)} placeholder="billing@company.com" /></label><label>Currency<select value={invoice.currency} onChange={(event) => update('currency', event.target.value)}>{currencies.map((currency) => <option key={currency}>{currency}</option>)}</select></label><label className={styles.fullField}>Billing address<input value={invoice.address} onChange={(event) => update('address', event.target.value)} placeholder="Street, city, postal code" /></label></div></div>

              <div className={styles.formSection}><div className={styles.formHeading}><span>03</span><h3>Line items</h3></div><div className={styles.itemHeaders}><span>DESCRIPTION</span><span>QTY</span><span>RATE</span><span>AMOUNT</span><i /></div>{invoice.items.map((item) => <div className={styles.itemRow} key={item.id}><input aria-label="Item description" value={item.description} onChange={(event) => updateItem(item.id, 'description', event.target.value)} placeholder="What did you work on?" /><input aria-label="Quantity" type="number" min="0" value={item.quantity} onChange={(event) => updateItem(item.id, 'quantity', event.target.value)} /><div className={styles.rateField}><span>{invoice.currency === 'USD' ? '$' : invoice.currency === 'EUR' ? '€' : invoice.currency === 'GBP' ? '£' : '₦'}</span><input aria-label="Rate" type="number" min="0" value={item.rate} onChange={(event) => updateItem(item.id, 'rate', event.target.value)} /></div><strong>{money(Number(item.quantity || 0) * Number(item.rate || 0), invoice.currency)}</strong><button className={styles.removeItem} onClick={() => update('items', invoice.items.filter((line) => line.id !== item.id))} aria-label="Remove line item">×</button></div>)}<button className={styles.addItem} onClick={() => update('items', [...invoice.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }])}>＋ Add line item</button></div>

              <div className={styles.formSection}><div className={styles.formHeading}><span>04</span><h3>Dates & notes</h3></div><div className={styles.formGrid}><label>Issue date<input type="date" value={invoice.issueDate} onChange={(event) => update('issueDate', event.target.value)} /></label><label>Due date<input type="date" value={invoice.dueDate} onChange={(event) => update('dueDate', event.target.value)} /></label><label>Tax rate <span className={styles.labelOptional}>OPTIONAL</span><div className={styles.taxInput}><input type="number" min="0" value={invoice.tax} onChange={(event) => update('tax', event.target.value)} /><span>%</span></div></label><label className={styles.fullField}>Note to client<textarea value={invoice.notes} onChange={(event) => update('notes', event.target.value)} rows="2" /></label></div></div>

              <div className={styles.editorActions}><button className={styles.buttonQuiet} onClick={() => save('Draft')}>Save draft</button><button className={styles.buttonPrimary} onClick={() => save('Sent')}>Mark as sent <span>↗</span></button></div>
            </div>
          </section>

          <aside className={styles.previewColumn}><div className={styles.previewTop}><div><p className={styles.overline}>LIVE PREVIEW</p><span>Updates as you edit</span></div><button className={styles.printButton} onClick={() => window.print()} aria-label="Print invoice" title="Print invoice">⎙</button></div>
            <article className={styles.invoicePaper}>
              <div className={styles.paperTop}><span className={styles.paperLogo}>JD<span>.</span></span><span className={styles.paperLabel}>INVOICE</span></div>
              <div className={styles.paperNumber}>{invoice.id}</div>
              <div className={styles.paperParties}><div><span>FROM</span><strong>Jordan Davis Studio</strong><p>hello@jordandavis.studio<br />Brooklyn, NY 11211</p></div><div><span>BILL TO</span><strong>{invoice.client || 'Client name'}</strong><p>{invoice.email || 'client@email.com'}<br />{invoice.address || 'Billing address'}</p></div></div>
              <div className={styles.paperDates}><div><span>ISSUED</span><strong>{dateLabel(invoice.issueDate)}</strong></div><div><span>DUE DATE</span><strong>{dateLabel(invoice.dueDate)}</strong></div></div>
              <div className={styles.paperItems}><div className={styles.paperItemHead}><span>DESCRIPTION</span><span>AMOUNT</span></div>{invoice.items.map((item) => <div className={styles.paperItem} key={item.id}><span>{item.description || 'New item'}<small>{item.quantity} × {money(Number(item.rate || 0), invoice.currency)}</small></span><strong>{money(Number(item.quantity || 0) * Number(item.rate || 0), invoice.currency)}</strong></div>)}</div>
              <div className={styles.paperTotals}><div><span>Subtotal</span><strong>{money(subtotal, invoice.currency)}</strong></div>{Number(invoice.tax) > 0 && <div><span>Tax ({invoice.tax}%)</span><strong>{money(taxAmount, invoice.currency)}</strong></div>}<div className={styles.paperTotal}><span>Total due</span><strong>{money(total, invoice.currency)}</strong></div></div>
              <div className={styles.paperNote}><span>NOTE</span><p>{invoice.notes || 'No additional notes.'}</p></div>
              <div className={styles.paperFooter}>THANK YOU FOR YOUR BUSINESS <span>·</span> {invoice.id}</div>
            </article>
            <div className={styles.previewHint}><span>↗</span> Your invoice is ready to print or save as PDF.</div>
          </aside>
        </div>

        <section className={styles.recentSection}><div className={styles.recentHeading}><div><p className={styles.overline}>YOUR WORK</p><h2>Recent invoices</h2></div><button className={styles.viewAllButton} onClick={() => document.getElementById('recent-invoices')?.scrollIntoView({ behavior: 'smooth' })}>View all <span>↓</span></button></div><div className={styles.invoiceTable} id="recent-invoices"><div className={styles.tableHead}><span>INVOICE</span><span>CLIENT</span><span>DATE</span><span>AMOUNT</span><span>STATUS</span><i /></div>{invoices.length === 0 ? <div className={styles.tableEmpty}>Your saved invoices will show up here.</div> : invoices.map((record) => <div className={styles.tableRow} key={record.id}><button className={styles.invoiceLink} onClick={() => openInvoice(record)}>{record.id}</button><span>{record.client || 'Untitled client'}</span><span>{dateLabel(record.issueDate)}</span><strong>{money(record.total, record.currency || 'USD')}</strong><span><i className={`${styles.tableStatus} ${record.status === 'Paid' ? styles.paidStatus : record.status === 'Sent' ? styles.sentStatus : ''}`} />{record.status}</span><button className={styles.rowAction} onClick={() => record.status === 'Paid' ? openInvoice(record) : markPaid(record)} aria-label={record.status === 'Paid' ? 'Open invoice' : 'Mark invoice paid'}>{record.status === 'Paid' ? '↗' : '✓'}</button></div>)}</div></section>
      </>}
      {notice && <div className={styles.toast} role="status">✓ {notice}</div>}
      <footer className={styles.pageFooter}><span>TITUS LEDGER</span><span>Simple billing, beautifully handled.</span></footer>
    </main>
  </div>
}