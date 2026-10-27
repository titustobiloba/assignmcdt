import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import styles from './index.module.css'

const currencies = ['USD', 'EUR', 'GBP', 'NGN']
const today = new Date().toISOString().slice(0, 10)
const defaultBusiness = { name: '', email: '', address: '' }

function businessInitials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'TL'
}

function businessStorageKey(email) {
  return `ledger-business:${email.toLowerCase()}`
}

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
  const [clients, setClients] = useState([])
  const [clientForm, setClientForm] = useState({ name: '', email: '', address: '' })
  const [clientError, setClientError] = useState('')
  const [business, setBusiness] = useState(defaultBusiness)
  const [businessForm, setBusinessForm] = useState(defaultBusiness)
  const [editingBusiness, setEditingBusiness] = useState(false)
  const [activeView, setActiveView] = useState('editor')
  const [notice, setNotice] = useState('')
  const [authUser, setAuthUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [authMode, setAuthMode] = useState('signin')
  const [resetSubmitted, setResetSubmitted] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ledger-invoices')
      if (saved) setInvoices(JSON.parse(saved))
      const savedClients = window.localStorage.getItem('ledger-clients')
      if (savedClients) setClients(JSON.parse(savedClients))
      const savedBusiness = window.localStorage.getItem('ledger-business')
      if (savedBusiness) {
        const businessDetails = { ...defaultBusiness, ...JSON.parse(savedBusiness) }
        setBusiness(businessDetails)
        setBusinessForm(businessDetails)
      }
      const savedUser = window.localStorage.getItem('ledger-account')
      if (savedUser) {
        const user = JSON.parse(savedUser)
        setAuthUser(user)
        const personalBusiness = window.localStorage.getItem(businessStorageKey(user.email))
        const legacyBusiness = window.localStorage.getItem('ledger-business')
        const businessDetails = personalBusiness ? { ...defaultBusiness, ...JSON.parse(personalBusiness) } : legacyBusiness ? { ...defaultBusiness, ...JSON.parse(legacyBusiness) } : defaultBusiness
        setBusiness(businessDetails)
        setBusinessForm(businessDetails)
        if (!personalBusiness && legacyBusiness) {
          window.localStorage.setItem(businessStorageKey(user.email), JSON.stringify(businessDetails))
          window.localStorage.removeItem('ledger-business')
        }
      }
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

  function addClient(event) {
    event.preventDefault()
    const name = clientForm.name.trim()
    if (!name) {
      setClientError('Enter a client name to continue.')
      return
    }
    if (clients.some((client) => client.name.toLowerCase() === name.toLowerCase())) {
      setClientError('A client with this name already exists.')
      return
    }
    const next = [...clients, { id: Date.now(), name, email: clientForm.email.trim(), address: clientForm.address.trim() }]
    setClients(next)
    window.localStorage.setItem('ledger-clients', JSON.stringify(next))
    setClientForm({ name: '', email: '', address: '' })
    setClientError('')
    setNotice('Client added')
    window.setTimeout(() => setNotice(''), 2400)
  }

  function selectClient(clientId) {
    const client = clients.find((item) => String(item.id) === clientId)
    if (!client) return
    setInvoice((current) => ({ ...current, client: client.name, email: client.email, address: client.address }))
  }

  function saveBusiness(event) {
    event.preventDefault()
    const updatedBusiness = {
      name: businessForm.name.trim(),
      email: businessForm.email.trim(),
      address: businessForm.address.trim(),
    }
    if (!updatedBusiness.name) return
    setBusiness(updatedBusiness)
    window.localStorage.setItem(businessStorageKey(authUser.email), JSON.stringify(updatedBusiness))
    setEditingBusiness(false)
    setNotice('Business details updated')
    window.setTimeout(() => setNotice(''), 2400)
  }

  function signIn(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email')).trim().toLowerCase()
    const name = email.split('@')[0].split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    const user = { email, name: name || 'Account', accountType: 'person' }
    const savedBusiness = window.localStorage.getItem(businessStorageKey(email))
    const businessDetails = savedBusiness ? { ...defaultBusiness, ...JSON.parse(savedBusiness) } : defaultBusiness
    window.localStorage.setItem('ledger-account', JSON.stringify(user))
    setAuthUser(user)
    setBusiness(businessDetails)
    setBusinessForm(businessDetails)
    setLoginError('')
  }

  function signUp(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('password'))
    const confirmPassword = String(formData.get('confirmPassword'))
    if (password !== confirmPassword) {
      setLoginError('Your passwords do not match.')
      return
    }
    const email = String(formData.get('email')).trim().toLowerCase()
    const name = String(formData.get('name')).trim()
    const newBusiness = {
      name: String(formData.get('businessName')).trim(),
      email: String(formData.get('businessEmail')).trim() || email,
      address: String(formData.get('businessAddress')).trim(),
    }
    const user = { email, name, accountType: 'person' }
    window.localStorage.setItem('ledger-account', JSON.stringify(user))
    window.localStorage.setItem(businessStorageKey(email), JSON.stringify(newBusiness))
    setBusiness(newBusiness)
    setBusinessForm(newBusiness)
    setAuthUser(user)
    setLoginError('')
  }

  function requestPasswordReset(event) {
    event.preventDefault()
    setResetSubmitted(true)
  }

  function signOut() {
    window.localStorage.removeItem('ledger-account')
    setAuthUser(null)
    setAccountOpen(false)
  }

  if (!authReady) return <div className={styles.invoiceApp}><Head><title>Titus Ledger | Sign in</title></Head></div>

  if (!authUser) return <div className={styles.invoiceApp}>
    <Head><title>{authMode === 'signup' ? 'Create account' : authMode === 'reset' ? 'Reset password' : 'Sign in'} | Titus Ledger</title><meta name="description" content="Access your Titus Ledger invoice workspace." /></Head>
    <main className={styles.authScreen}>
      <a className={styles.invoiceBrand} href="#signin"><span className={styles.brandMark}>TL</span><span>Titus Ledger<span className={styles.brandDot}>.</span></span></a>
      <section className={styles.authPanel}>
        {authMode === 'signin' && <>
          <p className={styles.overline}>YOUR BILLING WORKSPACE</p>
          <h1>Welcome back.</h1>
          <p className={styles.authIntro}>Sign in to manage your invoices and client details.</p>
          <form className={styles.authForm} onSubmit={signIn}>
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@studio.com" required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required minLength="4" /></label>
            {loginError && <p className={styles.authError} role="alert">{loginError}</p>}
            <button className={styles.authLink} type="button" onClick={() => { setAuthMode('reset'); setLoginError(''); setResetSubmitted(false) }}>Forgot password?</button>
            <button className={styles.buttonPrimary} type="submit">Sign in <span>→</span></button>
          </form>
          <p className={styles.authSwitch}>New to Titus Ledger? <button type="button" onClick={() => { setAuthMode('signup'); setLoginError('') }}>Create an account</button></p>
          <p className={styles.authDisclaimer}>Demo sign-in only. Add an authentication provider before using real accounts.</p>
        </>}
        {authMode === 'signup' && <>
          <p className={styles.overline}>PERSONAL ACCOUNT</p>
          <h1>Create your account.</h1>
          <p className={styles.authIntro}>Create your personal account and add the business or project you invoice for.</p>
          <form className={styles.authForm} onSubmit={signUp}>
            <label>Your name<input name="name" autoComplete="name" placeholder="Jordan Davis" required /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@studio.com" required /></label>
            <label>Business or project name<input name="businessName" autoComplete="organization" placeholder="Your business or project" required /></label>
            <label>Business email <span className={styles.authOptional}>OPTIONAL</span><input name="businessEmail" type="email" autoComplete="email" placeholder="Defaults to your account email" /></label>
            <label>Business address <span className={styles.authOptional}>OPTIONAL</span><input name="businessAddress" autoComplete="street-address" placeholder="Street, city, postal code" /></label>
            <label>Password<input name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" required minLength="8" /></label>
            <label>Confirm password<input name="confirmPassword" type="password" autoComplete="new-password" placeholder="Enter your password again" required minLength="8" /></label>
            {loginError && <p className={styles.authError} role="alert">{loginError}</p>}
            <button className={styles.buttonPrimary} type="submit">Create account <span>→</span></button>
          </form>
          <p className={styles.authSwitch}>Already have an account? <button type="button" onClick={() => { setAuthMode('signin'); setLoginError('') }}>Sign in</button></p>
          <p className={styles.authDisclaimer}>Demo account only. Passwords are not stored or verified.</p>
        </>}
        {authMode === 'reset' && <>
          <p className={styles.overline}>ACCOUNT RECOVERY</p>
          <h1>{resetSubmitted ? 'Request received.' : 'Forgot password?'}</h1>
          {resetSubmitted ? <><p className={styles.authIntro}>Password recovery email delivery is not set up in this demo, so no email was sent. Connect an authentication provider to enable secure resets.</p><button className={styles.buttonPrimary} onClick={() => { setAuthMode('signin'); setResetSubmitted(false) }}>Back to sign in</button></> : <>
            <p className={styles.authIntro}>Enter your account email to request a password reset.</p>
            <form className={styles.authForm} onSubmit={requestPasswordReset}>
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@studio.com" required /></label>
              <button className={styles.buttonPrimary} type="submit">Request reset <span>→</span></button>
            </form>
            <p className={styles.authSwitch}><button type="button" onClick={() => { setAuthMode('signin'); setResetSubmitted(false) }}>← Back to sign in</button></p>
            <p className={styles.authDisclaimer}>Password recovery email requires a configured authentication provider.</p>
          </>}
        </>}
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
      <div className={styles.sideBottom}><div className={styles.avatar}>{authUser.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</div><div><strong>{authUser.name}</strong><small>{authUser.email}</small></div><button aria-label="Open account menu" aria-expanded={accountOpen} onClick={() => setAccountOpen(!accountOpen)}>···</button>{accountOpen && <div className={styles.accountMenu}><strong>{authUser.email}</strong><button onClick={signOut}>↪ <span>Log out</span></button></div>}</div>
    </aside>

    <main className={styles.invoiceMain} id="workspace">
      <header className={styles.topbar}><div className={styles.breadcrumb}>Workspace <span>/</span> <b>{activeView === 'editor' ? 'Invoices' : 'Clients'}</b></div><div className={styles.topbarRight}><span className={styles.syncStatus}><i /> All changes saved</span><button className={styles.helpButton} aria-label="Help">?</button></div></header>
      {activeView === 'clients' ? <section className={styles.clientsPage}>
        <div className={styles.clientsHeading}><div><p className={styles.overline}>CLIENT DIRECTORY</p><h1>Clients<span className={styles.headingCount}>{clients.length}</span></h1><p className={styles.headingSub}>Keep client details handy for your next invoice.</p></div></div>
        <form className={styles.clientForm} onSubmit={addClient}>
          <div className={styles.formHeading}><span>＋</span><h3>Add a client</h3></div>
          <div className={styles.clientFormFields}>
            <label>Client name<input autoFocus value={clientForm.name} onChange={(event) => setClientForm((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Acme Studio" required /></label>
            <label>Email address <span>OPTIONAL</span><input type="email" value={clientForm.email} onChange={(event) => setClientForm((current) => ({ ...current, email: event.target.value }))} placeholder="billing@company.com" /></label>
            <label>Billing address <span>OPTIONAL</span><input value={clientForm.address} onChange={(event) => setClientForm((current) => ({ ...current, address: event.target.value }))} placeholder="Street, city, postal code" /></label>
            <button type="submit" className={styles.buttonPrimary}>Add client <span>＋</span></button>
          </div>
          {clientError && <p className={styles.clientError} role="alert">{clientError}</p>}
        </form>
        <div className={styles.clientListHead}><h2>All clients</h2><span>{clients.length} {clients.length === 1 ? 'client' : 'clients'}</span></div>
        <div className={styles.clientList}>
          {clients.length === 0 ? <div className={styles.tableEmpty}>No clients yet. Add a client above to get started.</div> : clients.map((client) => <div className={styles.clientRow} key={client.id}><div className={styles.clientAvatar}>{client.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}</div><div className={styles.clientIdentity}><strong>{client.name}</strong><span>{client.email || 'No email added'}</span></div><div className={styles.clientAddress}>{client.address || 'No address added'}</div><button className={styles.clientUseButton} onClick={() => { setInvoice((current) => ({ ...current, client: client.name, email: client.email, address: client.address })); setActiveView('editor') }}>Create invoice <span>↗</span></button></div>)}
        </div>
      </section> : <>
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
              <div className={styles.formSection}><div className={styles.formHeading}><span>01</span><h3>Your business details</h3></div>{editingBusiness ? <form className={styles.businessEditForm} onSubmit={saveBusiness}><label>Business or project name<input autoFocus required value={businessForm.name} onChange={(event) => setBusinessForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your business name" /></label><label>Contact email<input type="email" value={businessForm.email} onChange={(event) => setBusinessForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@business.com" /></label><label>Business address<input value={businessForm.address} onChange={(event) => setBusinessForm((current) => ({ ...current, address: event.target.value }))} placeholder="Street, city, postal code" /></label><div className={styles.businessEditActions}><button type="button" className={styles.buttonQuiet} onClick={() => { setBusinessForm(business); setEditingBusiness(false) }}>Cancel</button><button type="submit" className={styles.buttonPrimary}>Save details</button></div></form> : <div className={styles.businessBlock}><div className={styles.businessMark}>{businessInitials(business.name)}</div><div><strong>{business.name || 'Add your business or project name'}</strong><p>{business.email || 'Add a contact email'}{business.address && <><br />{business.address}</>}</p></div><button className={styles.textButton} onClick={() => { setBusinessForm(business); setEditingBusiness(true) }}>{business.name ? 'Edit details' : 'Add details'}</button></div>}</div>

              <div className={styles.formSection}><div className={styles.formHeading}><span>02</span><h3>Bill to</h3></div><div className={styles.formGrid}>{clients.length > 0 && <label className={styles.fullField}>Select saved client<select defaultValue="" onChange={(event) => selectClient(event.target.value)}><option value="">Choose a client...</option>{clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label>}<label className={styles.fullField}>Client or company<input value={invoice.client} onChange={(event) => update('client', event.target.value)} placeholder="e.g. Acme Studio" /></label><label>Email address<input type="email" value={invoice.email} onChange={(event) => update('email', event.target.value)} placeholder="billing@company.com" /></label><label>Currency<select value={invoice.currency} onChange={(event) => update('currency', event.target.value)}>{currencies.map((currency) => <option key={currency}>{currency}</option>)}</select></label><label className={styles.fullField}>Billing address<input value={invoice.address} onChange={(event) => update('address', event.target.value)} placeholder="Street, city, postal code" /></label></div></div>

              <div className={styles.formSection}><div className={styles.formHeading}><span>03</span><h3>Line items</h3></div><div className={styles.itemHeaders}><span>DESCRIPTION</span><span>QTY</span><span>RATE</span><span>AMOUNT</span><i /></div>{invoice.items.map((item) => <div className={styles.itemRow} key={item.id}><input aria-label="Item description" value={item.description} onChange={(event) => updateItem(item.id, 'description', event.target.value)} placeholder="What did you work on?" /><input aria-label="Quantity" type="number" min="0" value={item.quantity} onChange={(event) => updateItem(item.id, 'quantity', event.target.value)} /><div className={styles.rateField}><span>{invoice.currency === 'USD' ? '$' : invoice.currency === 'EUR' ? '€' : invoice.currency === 'GBP' ? '£' : '₦'}</span><input aria-label="Rate" type="number" min="0" value={item.rate} onChange={(event) => updateItem(item.id, 'rate', event.target.value)} /></div><strong>{money(Number(item.quantity || 0) * Number(item.rate || 0), invoice.currency)}</strong><button className={styles.removeItem} onClick={() => update('items', invoice.items.filter((line) => line.id !== item.id))} aria-label="Remove line item">×</button></div>)}<button className={styles.addItem} onClick={() => update('items', [...invoice.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }])}>＋ Add line item</button></div>

              <div className={styles.formSection}><div className={styles.formHeading}><span>04</span><h3>Dates & notes</h3></div><div className={styles.formGrid}><label>Issue date<input type="date" value={invoice.issueDate} onChange={(event) => update('issueDate', event.target.value)} /></label><label>Due date<input type="date" value={invoice.dueDate} onChange={(event) => update('dueDate', event.target.value)} /></label><label>Tax rate <span className={styles.labelOptional}>OPTIONAL</span><div className={styles.taxInput}><input type="number" min="0" value={invoice.tax} onChange={(event) => update('tax', event.target.value)} /><span>%</span></div></label><label className={styles.fullField}>Note to client<textarea value={invoice.notes} onChange={(event) => update('notes', event.target.value)} rows="2" /></label></div></div>

              <div className={styles.editorActions}><button className={styles.buttonQuiet} onClick={() => save('Draft')}>Save draft</button><button className={styles.buttonPrimary} onClick={() => save('Sent')}>Mark as sent <span>↗</span></button></div>
            </div>
          </section>

          <aside className={styles.previewColumn}><div className={styles.previewTop}><div><p className={styles.overline}>LIVE PREVIEW</p><span>Updates as you edit</span></div><button className={styles.printButton} onClick={() => window.print()} aria-label="Print invoice" title="Print invoice">⎙</button></div>
            <article className={styles.invoicePaper}>
              <div className={styles.paperTop}><span className={styles.paperLogo}>{businessInitials(business.name)}<span>.</span></span><span className={styles.paperLabel}>INVOICE</span></div>
              <div className={styles.paperNumber}>{invoice.id}</div>
              <div className={styles.paperParties}><div><span>FROM</span><strong>{business.name || 'Your business or project'}</strong><p>{business.email || 'Your contact email'}{business.address && <><br />{business.address}</>}</p></div><div><span>BILL TO</span><strong>{invoice.client || 'Client name'}</strong><p>{invoice.email || 'client@email.com'}<br />{invoice.address || 'Billing address'}</p></div></div>
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