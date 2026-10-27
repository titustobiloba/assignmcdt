module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/pages/InvoiceApp.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InvoiceApp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/index.module.css [ssr] (css module)");
;
;
;
;
const currencies = [
    'USD',
    'EUR',
    'GBP',
    'NGN'
];
const today = new Date().toISOString().slice(0, 10);
function createInvoice(id = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`) {
    const date = new Date();
    const due = new Date(date);
    due.setDate(date.getDate() + 14);
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
        items: [
            {
                id: Date.now(),
                description: 'Design services',
                quantity: 1,
                rate: 850
            }
        ]
    };
}
function money(value, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 2
    }).format(value || 0);
}
function dateLabel(value) {
    if (!value) return '—';
    return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}
function InvoiceApp() {
    const [invoice, setInvoice] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(()=>createInvoice('INV-2026-0001'));
    const [invoices, setInvoices] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('editor');
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [authUser, setAuthUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [authReady, setAuthReady] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [accountOpen, setAccountOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [loginError, setLoginError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        try {
            const saved = window.localStorage.getItem('ledger-invoices');
            if (saved) setInvoices(JSON.parse(saved));
            const savedUser = window.localStorage.getItem('ledger-account');
            if (savedUser) setAuthUser(JSON.parse(savedUser));
        } catch  {
            setInvoices([]);
            window.localStorage.removeItem('ledger-account');
        }
        setAuthReady(true);
    }, []);
    const subtotal = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>invoice.items.reduce((sum, item)=>sum + Number(item.quantity || 0) * Number(item.rate || 0), 0), [
        invoice.items
    ]);
    const taxAmount = subtotal * Number(invoice.tax || 0) / 100;
    const total = subtotal + taxAmount;
    const paidTotal = invoices.filter((item)=>item.status === 'Paid').reduce((sum, item)=>sum + Number(item.total || 0), 0);
    const outstandingTotal = invoices.filter((item)=>item.status !== 'Paid').reduce((sum, item)=>sum + Number(item.total || 0), 0);
    function update(field, value) {
        setInvoice((current)=>({
                ...current,
                [field]: value
            }));
    }
    function updateItem(id, field, value) {
        setInvoice((current)=>({
                ...current,
                items: current.items.map((item)=>item.id === id ? {
                        ...item,
                        [field]: value
                    } : item)
            }));
    }
    function save(status = invoice.status) {
        const record = {
            ...invoice,
            status,
            total
        };
        const next = [
            record,
            ...invoices.filter((item)=>item.id !== invoice.id)
        ];
        setInvoices(next);
        window.localStorage.setItem('ledger-invoices', JSON.stringify(next));
        setInvoice(record);
        setNotice(status === 'Sent' ? 'Invoice marked as sent' : 'Draft saved');
        window.setTimeout(()=>setNotice(''), 2400);
    }
    function openInvoice(record) {
        setInvoice({
            ...record,
            items: record.items || []
        });
        setActiveView('editor');
    }
    function markPaid(record) {
        const next = invoices.map((item)=>item.id === record.id ? {
                ...item,
                status: 'Paid'
            } : item);
        setInvoices(next);
        window.localStorage.setItem('ledger-invoices', JSON.stringify(next));
    }
    function startNew() {
        setInvoice(createInvoice());
        setActiveView('editor');
    }
    function signIn(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = String(formData.get('email')).trim().toLowerCase();
        const name = email.split('@')[0].split(/[._-]/).map((part)=>part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
        const user = {
            email,
            name: name || 'Account'
        };
        window.localStorage.setItem('ledger-account', JSON.stringify(user));
        setAuthUser(user);
        setLoginError('');
    }
    function signOut() {
        window.localStorage.removeItem('ledger-account');
        setAuthUser(null);
        setAccountOpen(false);
    }
    if (!authReady) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceApp,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                children: "Titus Ledger | Sign in"
            }, void 0, false, {
                fileName: "[project]/pages/InvoiceApp.jsx",
                lineNumber: 116,
                columnNumber: 67
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/InvoiceApp.jsx",
            lineNumber: 116,
            columnNumber: 61
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/InvoiceApp.jsx",
        lineNumber: 116,
        columnNumber: 26
    }, this);
    if (!authUser) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceApp,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Sign in | Titus Ledger"
                    }, void 0, false, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Sign in to your Titus Ledger invoice workspace."
                    }, void 0, false, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 119,
                        columnNumber: 48
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/InvoiceApp.jsx",
                lineNumber: 119,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authScreen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceBrand,
                        href: "#signin",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].brandMark,
                                children: "TL"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 121,
                                columnNumber: 57
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: [
                                    "Titus Ledger",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].brandDot,
                                        children: "."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 121,
                                        columnNumber: 119
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 121,
                                columnNumber: 101
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 121,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authPanel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overline,
                                children: "YOUR BILLING WORKSPACE"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 123,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                children: "Welcome back."
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 124,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authIntro,
                                children: "Sign in to manage your invoices and client details."
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 125,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authForm,
                                onSubmit: signIn,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Email address",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                name: "email",
                                                type: "email",
                                                autoComplete: "email",
                                                placeholder: "you@studio.com",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 127,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 127,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        children: [
                                            "Password",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                name: "password",
                                                type: "password",
                                                autoComplete: "current-password",
                                                placeholder: "Enter your password",
                                                required: true,
                                                minLength: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 128,
                                                columnNumber: 26
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 128,
                                        columnNumber: 11
                                    }, this),
                                    loginError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authError,
                                        role: "alert",
                                        children: loginError
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 129,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonPrimary,
                                        type: "submit",
                                        children: [
                                            "Sign in ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "→"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 130,
                                                columnNumber: 74
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 130,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 126,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authDisclaimer,
                                children: "Local demo sign-in. Credentials are not sent to a server."
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 132,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 122,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authFooter,
                        children: [
                            "TITUS LEDGER ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 134,
                                columnNumber: 53
                            }, this),
                            " SIMPLE BILLING, BEAUTIFULLY HANDLED"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 134,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/InvoiceApp.jsx",
                lineNumber: 120,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/InvoiceApp.jsx",
        lineNumber: 118,
        columnNumber: 25
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceApp,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: "Titus Ledger | Invoices"
                    }, void 0, false, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 140,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Create, manage, and print professional invoices."
                    }, void 0, false, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 141,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/InvoiceApp.jsx",
                lineNumber: 139,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sidebar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceBrand,
                        href: "#workspace",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].brandMark,
                                children: "TL"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 144,
                                columnNumber: 60
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: [
                                    "Titus Ledger",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].brandDot,
                                        children: "."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 144,
                                        columnNumber: 122
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 144,
                                columnNumber: 104
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 144,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].workspaceLabel,
                        children: "WORKSPACE"
                    }, void 0, false, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 145,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sideNav,
                        "aria-label": "Workspace",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: activeView === 'editor' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navActive : '',
                                onClick: ()=>setActiveView('editor'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "▤"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 147,
                                        columnNumber: 117
                                    }, this),
                                    " Invoices ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                        children: invoices.length
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 147,
                                        columnNumber: 141
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 147,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: activeView === 'clients' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navActive : '',
                                onClick: ()=>setActiveView('clients'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "♙"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 148,
                                        columnNumber: 119
                                    }, this),
                                    " Clients"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 148,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 146,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sideBottom,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].avatar,
                                children: authUser.name.split(' ').map((part)=>part[0]).join('').slice(0, 2).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 150,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: authUser.name
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 150,
                                        columnNumber: 168
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                        children: authUser.email
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 150,
                                        columnNumber: 200
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 150,
                                columnNumber: 163
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                "aria-label": "Account options",
                                "aria-expanded": accountOpen,
                                onClick: ()=>setAccountOpen(!accountOpen),
                                children: "···"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 150,
                                columnNumber: 237
                            }, this),
                            accountOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].accountMenu,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                        children: authUser.email
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 150,
                                        columnNumber: 411
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: signOut,
                                        children: [
                                            "↪ ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "Log out"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 150,
                                                columnNumber: 472
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 150,
                                        columnNumber: 444
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 150,
                                columnNumber: 375
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 150,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/InvoiceApp.jsx",
                lineNumber: 143,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceMain,
                id: "workspace",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].topbar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].breadcrumb,
                                children: [
                                    "Workspace ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 154,
                                        columnNumber: 86
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                        children: activeView === 'editor' ? 'Invoices' : 'Clients'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 154,
                                        columnNumber: 101
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 154,
                                columnNumber: 41
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].topbarRight,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].syncStatus,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 154,
                                                columnNumber: 236
                                            }, this),
                                            " All changes saved"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 154,
                                        columnNumber: 200
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].helpButton,
                                        "aria-label": "Help",
                                        children: "?"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 154,
                                        columnNumber: 266
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 154,
                                columnNumber: 164
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 154,
                        columnNumber: 7
                    }, this),
                    activeView === 'clients' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].emptyClients,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].emptyIcon,
                                children: "♙"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 155,
                                columnNumber: 76
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overline,
                                children: "CLIENT DIRECTORY"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 155,
                                columnNumber: 117
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                children: "Your clients live in your invoices."
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 155,
                                columnNumber: 168
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                children: "Client details appear here as you create invoices. Start with a new invoice to add your first client."
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 155,
                                columnNumber: 212
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonPrimary,
                                onClick: startNew,
                                children: "＋ New invoice"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 155,
                                columnNumber: 320
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 155,
                        columnNumber: 35
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageHeading,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overline,
                                                children: [
                                                    "MONDAY, ",
                                                    new Date().toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    }).toUpperCase()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 156,
                                                columnNumber: 54
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                children: [
                                                    "Invoices",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].headingCount,
                                                        children: invoices.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 156,
                                                        columnNumber: 215
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 156,
                                                columnNumber: 203
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].headingSub,
                                                children: "Create and keep track of your client billing."
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 156,
                                                columnNumber: 282
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 156,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonPrimary,
                                        onClick: startNew,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "＋"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 156,
                                                columnNumber: 430
                                            }, this),
                                            " New invoice"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 156,
                                        columnNumber: 370
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 156,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statStrip,
                                "aria-label": "Invoice summary",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "OUTSTANDING"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 159,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: money(outstandingTotal, 'USD')
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 159,
                                                columnNumber: 40
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                children: [
                                                    invoices.filter((item)=>item.status !== 'Paid').length,
                                                    " invoices"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 159,
                                                columnNumber: 89
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 159,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "PAID THIS YEAR"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 160,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: money(paidTotal, 'USD')
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 160,
                                                columnNumber: 43
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                children: [
                                                    invoices.filter((item)=>item.status === 'Paid').length,
                                                    " invoices"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 160,
                                                columnNumber: 85
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 160,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "ALL INVOICES"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 161,
                                                columnNumber: 16
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: String(invoices.length).padStart(2, '0')
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 161,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                children: "Across all clients"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 161,
                                                columnNumber: 100
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 161,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 158,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contentGrid,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editorColumn,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overline,
                                                                children: "INVOICE EDITOR"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 166,
                                                                columnNumber: 55
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                                children: invoice.id
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 166,
                                                                columnNumber: 104
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 166,
                                                        columnNumber: 50
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusBadge} ${invoice.status === 'Sent' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusSent : ''}`,
                                                        children: invoice.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 166,
                                                        columnNumber: 131
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 166,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editorPanel,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formSection,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formHeading,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "01"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 87
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                        children: "From your business"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 168,
                                                                columnNumber: 51
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].businessBlock,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].businessMark,
                                                                        children: "JD"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 173
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                                children: "Jordan Davis Studio"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 168,
                                                                                columnNumber: 223
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                children: [
                                                                                    "hello@jordandavis.studio",
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                        lineNumber: 168,
                                                                                        columnNumber: 286
                                                                                    }, this),
                                                                                    "Brooklyn, NY 11211"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 168,
                                                                                columnNumber: 259
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 218
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textButton,
                                                                        children: "Edit details"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 320
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 168,
                                                                columnNumber: 135
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 168,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formSection,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formHeading,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "02"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 87
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                        children: "Bill to"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 170,
                                                                columnNumber: 51
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGrid,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fullField,
                                                                        children: [
                                                                            "Client or company",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                value: invoice.client,
                                                                                onChange: (event)=>update('client', event.target.value),
                                                                                placeholder: "e.g. Acme Studio"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 170,
                                                                                columnNumber: 210
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 157
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        children: [
                                                                            "Email address",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                type: "email",
                                                                                value: invoice.email,
                                                                                onChange: (event)=>update('email', event.target.value),
                                                                                placeholder: "billing@company.com"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 170,
                                                                                columnNumber: 360
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 340
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        children: [
                                                                            "Currency",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                                                value: invoice.currency,
                                                                                onChange: (event)=>update('currency', event.target.value),
                                                                                children: currencies.map((currency)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                                        children: currency
                                                                                    }, currency, false, {
                                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                        lineNumber: 170,
                                                                                        columnNumber: 643
                                                                                    }, this))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 170,
                                                                                columnNumber: 519
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 504
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fullField,
                                                                        children: [
                                                                            "Billing address",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                value: invoice.address,
                                                                                onChange: (event)=>update('address', event.target.value),
                                                                                placeholder: "Street, city, postal code"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 170,
                                                                                columnNumber: 755
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 704
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 170,
                                                                columnNumber: 124
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 170,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formSection,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formHeading,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "03"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 87
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                        children: "Line items"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 172,
                                                                columnNumber: 51
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemHeaders,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "DESCRIPTION"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 163
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "QTY"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 187
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "RATE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 203
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "AMOUNT"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 220
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 239
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 172,
                                                                columnNumber: 127
                                                            }, this),
                                                            invoice.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemRow,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                            "aria-label": "Item description",
                                                                            value: item.description,
                                                                            onChange: (event)=>updateItem(item.id, 'description', event.target.value),
                                                                            placeholder: "What did you work on?"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 325
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                            "aria-label": "Quantity",
                                                                            type: "number",
                                                                            min: "0",
                                                                            value: item.quantity,
                                                                            onChange: (event)=>updateItem(item.id, 'quantity', event.target.value)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 502
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rateField,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                    children: invoice.currency === 'USD' ? '$' : invoice.currency === 'EUR' ? '€' : invoice.currency === 'GBP' ? '£' : '₦'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                    lineNumber: 172,
                                                                                    columnNumber: 685
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                    "aria-label": "Rate",
                                                                                    type: "number",
                                                                                    min: "0",
                                                                                    value: item.rate,
                                                                                    onChange: (event)=>updateItem(item.id, 'rate', event.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                    lineNumber: 172,
                                                                                    columnNumber: 808
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 651
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                            children: money(Number(item.quantity || 0) * Number(item.rate || 0), invoice.currency)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 951
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].removeItem,
                                                                            onClick: ()=>update('items', invoice.items.filter((line)=>line.id !== item.id)),
                                                                            "aria-label": "Remove line item",
                                                                            children: "×"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 172,
                                                                            columnNumber: 1046
                                                                        }, this)
                                                                    ]
                                                                }, item.id, true, {
                                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 279
                                                                }, this)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].addItem,
                                                                onClick: ()=>update('items', [
                                                                        ...invoice.items,
                                                                        {
                                                                            id: Date.now(),
                                                                            description: '',
                                                                            quantity: 1,
                                                                            rate: 0
                                                                        }
                                                                    ]),
                                                                children: "＋ Add line item"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 172,
                                                                columnNumber: 1217
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 172,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formSection,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formHeading,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "04"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 87
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                        children: "Dates & notes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 102
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 174,
                                                                columnNumber: 51
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGrid,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        children: [
                                                                            "Issue date",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: invoice.issueDate,
                                                                                onChange: (event)=>update('issueDate', event.target.value)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 174,
                                                                                columnNumber: 180
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 163
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        children: [
                                                                            "Due date",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: invoice.dueDate,
                                                                                onChange: (event)=>update('dueDate', event.target.value)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 174,
                                                                                columnNumber: 312
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 297
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        children: [
                                                                            "Tax rate ",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].labelOptional,
                                                                                children: "OPTIONAL"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 174,
                                                                                columnNumber: 441
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].taxInput,
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                                        type: "number",
                                                                                        min: "0",
                                                                                        value: invoice.tax,
                                                                                        onChange: (event)=>update('tax', event.target.value)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                        lineNumber: 174,
                                                                                        columnNumber: 528
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                        children: "%"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                        lineNumber: 174,
                                                                                        columnNumber: 635
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 174,
                                                                                columnNumber: 495
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 425
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fullField,
                                                                        children: [
                                                                            "Note to client",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                                                value: invoice.notes,
                                                                                onChange: (event)=>update('notes', event.target.value),
                                                                                rows: "2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 174,
                                                                                columnNumber: 713
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 663
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 174,
                                                                columnNumber: 130
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 174,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editorActions,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonQuiet,
                                                                onClick: ()=>save('Draft'),
                                                                children: "Save draft"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 176,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].buttonPrimary,
                                                                onClick: ()=>save('Sent'),
                                                                children: [
                                                                    "Mark as sent ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "↗"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 176,
                                                                        columnNumber: 224
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 176,
                                                                columnNumber: 141
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 176,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 167,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 165,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].previewColumn,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].previewTop,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overline,
                                                                children: "LIVE PREVIEW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 180,
                                                                columnNumber: 91
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "Updates as you edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 180,
                                                                columnNumber: 138
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 180,
                                                        columnNumber: 86
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].printButton,
                                                        onClick: ()=>window.print(),
                                                        "aria-label": "Print invoice",
                                                        title: "Print invoice",
                                                        children: "⎙"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 180,
                                                        columnNumber: 176
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 180,
                                                columnNumber: 51
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoicePaper,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperTop,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperLogo,
                                                                children: [
                                                                    "JD",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 182,
                                                                        columnNumber: 85
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 182,
                                                                columnNumber: 48
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperLabel,
                                                                children: "INVOICE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 182,
                                                                columnNumber: 106
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 182,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperNumber,
                                                        children: invoice.id
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 183,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperParties,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "FROM"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: "Jordan Davis Studio"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 74
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        children: [
                                                                            "hello@jordandavis.studio",
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 184,
                                                                                columnNumber: 137
                                                                            }, this),
                                                                            "Brooklyn, NY 11211"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 110
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 184,
                                                                columnNumber: 52
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "BILL TO"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 176
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: invoice.client || 'Client name'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 196
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        children: [
                                                                            invoice.email || 'client@email.com',
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                lineNumber: 184,
                                                                                columnNumber: 286
                                                                            }, this),
                                                                            invoice.address || 'Billing address'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 184,
                                                                        columnNumber: 246
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 184,
                                                                columnNumber: 171
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 184,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperDates,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "ISSUED"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 55
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: dateLabel(invoice.issueDate)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 74
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 185,
                                                                columnNumber: 50
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "DUE DATE"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 132
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: dateLabel(invoice.dueDate)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 153
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 185,
                                                                columnNumber: 127
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 185,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperItems,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperItemHead,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "DESCRIPTION"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 186,
                                                                        columnNumber: 88
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "AMOUNT"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 186,
                                                                        columnNumber: 112
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 186,
                                                                columnNumber: 50
                                                            }, this),
                                                            invoice.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperItem,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                item.description || 'New item',
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                                                                                    children: [
                                                                                        item.quantity,
                                                                                        " × ",
                                                                                        money(Number(item.rate || 0), invoice.currency)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                                                    lineNumber: 186,
                                                                                    columnNumber: 252
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 186,
                                                                            columnNumber: 214
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                            children: money(Number(item.quantity || 0) * Number(item.rate || 0), invoice.currency)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                                            lineNumber: 186,
                                                                            columnNumber: 341
                                                                        }, this)
                                                                    ]
                                                                }, item.id, true, {
                                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                                    lineNumber: 186,
                                                                    columnNumber: 166
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 186,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperTotals,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "Subtotal"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 56
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: money(subtotal, invoice.currency)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 187,
                                                                columnNumber: 51
                                                            }, this),
                                                            Number(invoice.tax) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "Tax (",
                                                                            invoice.tax,
                                                                            "%)"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 168
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: money(taxAmount, invoice.currency)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 201
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 187,
                                                                columnNumber: 163
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperTotal,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        children: "Total due"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 296
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                                        children: money(total, invoice.currency)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 318
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 187,
                                                                columnNumber: 261
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 187,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperNote,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "NOTE"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 188,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                children: invoice.notes || 'No additional notes.'
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 188,
                                                                columnNumber: 66
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 188,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paperFooter,
                                                        children: [
                                                            "THANK YOU FOR YOUR BUSINESS ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "·"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                                lineNumber: 189,
                                                                columnNumber: 79
                                                            }, this),
                                                            " ",
                                                            invoice.id
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 189,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 181,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].previewHint,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "↗"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 191,
                                                        columnNumber: 49
                                                    }, this),
                                                    " Your invoice is ready to print or save as PDF."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 191,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 180,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 164,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].recentSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].recentHeading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overline,
                                                        children: "YOUR WORK"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 94
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                        children: "Recent invoices"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 138
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 195,
                                                columnNumber: 89
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].viewAllButton,
                                                onClick: ()=>document.getElementById('recent-invoices')?.scrollIntoView({
                                                        behavior: 'smooth'
                                                    }),
                                                children: [
                                                    "View all ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "↓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 317
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 195,
                                                columnNumber: 168
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 195,
                                        columnNumber: 51
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceTable,
                                        id: "recent-invoices",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tableHead,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "INVOICE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 438
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "CLIENT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 458
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "DATE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 477
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "AMOUNT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 494
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: "STATUS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 513
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                                        lineNumber: 195,
                                                        columnNumber: 532
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 195,
                                                columnNumber: 404
                                            }, this),
                                            invoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tableEmpty,
                                                children: "Your saved invoices will show up here."
                                            }, void 0, false, {
                                                fileName: "[project]/pages/InvoiceApp.jsx",
                                                lineNumber: 195,
                                                columnNumber: 568
                                            }, this) : invoices.map((record)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tableRow,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].invoiceLink,
                                                            onClick: ()=>openInvoice(record),
                                                            children: record.id
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 724
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: record.client || 'Untitled client'
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 819
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: dateLabel(record.issueDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 868
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                            children: money(record.total, record.currency || 'USD')
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 910
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tableStatus} ${record.status === 'Paid' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].paidStatus : record.status === 'Sent' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sentStatus : ''}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 980
                                                                }, this),
                                                                record.status
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 974
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rowAction,
                                                            onClick: ()=>record.status === 'Paid' ? openInvoice(record) : markPaid(record),
                                                            "aria-label": record.status === 'Paid' ? 'Open invoice' : 'Mark invoice paid',
                                                            children: record.status === 'Paid' ? '↗' : '✓'
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/InvoiceApp.jsx",
                                                            lineNumber: 195,
                                                            columnNumber: 1143
                                                        }, this)
                                                    ]
                                                }, record.id, true, {
                                                    fileName: "[project]/pages/InvoiceApp.jsx",
                                                    lineNumber: 195,
                                                    columnNumber: 675
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/InvoiceApp.jsx",
                                        lineNumber: 195,
                                        columnNumber: 346
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 195,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 155,
                        columnNumber: 415
                    }, this),
                    notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].toast,
                        role: "status",
                        children: [
                            "✓ ",
                            notice
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 197,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageFooter,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "TITUS LEDGER"
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 198,
                                columnNumber: 45
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: "Simple billing, beautifully handled."
                            }, void 0, false, {
                                fileName: "[project]/pages/InvoiceApp.jsx",
                                lineNumber: 198,
                                columnNumber: 70
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/InvoiceApp.jsx",
                        lineNumber: 198,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/InvoiceApp.jsx",
                lineNumber: 153,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/InvoiceApp.jsx",
        lineNumber: 138,
        columnNumber: 10
    }, this);
}
}),
"[project]/pages/index.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/index.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$InvoiceApp$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/InvoiceApp.jsx [ssr] (ecmascript)");
;
;
;
;
;
const features = [
    {
        label: 'Sell crypto',
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                "Turn crypto into naira ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                    children: "before your tea gets cold"
                }, void 0, false, {
                    fileName: "[project]/pages/index.jsx",
                    lineNumber: 7,
                    columnNumber: 59
                }, ("TURBOPACK compile-time value", void 0)),
                "."
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.jsx",
            lineNumber: 7,
            columnNumber: 34
        }, ("TURBOPACK compile-time value", void 0)),
        copy: 'Send Bitcoin, USDT or any supported coin to your permanent Monica address. Naira credits at the live rate and clears to your bank over NIBSS in seconds.',
        image: '/app-screen-1.png',
        chips: [
            '0% fees',
            '40+ banks',
            'Under 60s payout'
        ]
    },
    {
        label: 'Pay bills',
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                "Every bill in Nigeria, ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                    children: "paid in seconds"
                }, void 0, false, {
                    fileName: "[project]/pages/index.jsx",
                    lineNumber: 8,
                    columnNumber: 57
                }, ("TURBOPACK compile-time value", void 0)),
                "."
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.jsx",
            lineNumber: 8,
            columnNumber: 32
        }, ("TURBOPACK compile-time value", void 0)),
        copy: 'Airtime, mobile data, DStv and GOtv, electricity, betting wallets and gift cards, straight from your Monica balance.',
        image: '/app-screen-3 (3).png',
        chips: [
            'MTN · Airtel · Glo',
            'Every DisCo',
            'Gift cards'
        ]
    },
    {
        label: 'Dollar card',
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                "Spend worldwide with a ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                    children: "virtual dollar card"
                }, void 0, false, {
                    fileName: "[project]/pages/index.jsx",
                    lineNumber: 9,
                    columnNumber: 59
                }, ("TURBOPACK compile-time value", void 0)),
                "."
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.jsx",
            lineNumber: 9,
            columnNumber: 34
        }, ("TURBOPACK compile-time value", void 0)),
        copy: 'Create a USD Visa card funded straight from crypto or naira. Pay Netflix, Spotify, ads and global merchants.',
        image: '/app-screen-3.png',
        chips: [
            'Virtual USD Visa',
            'Funded from crypto',
            'Global merchants'
        ]
    },
    {
        label: 'Send & receive',
        title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                "Transfers that ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                    children: "just land"
                }, void 0, false, {
                    fileName: "[project]/pages/index.jsx",
                    lineNumber: 10,
                    columnNumber: 54
                }, ("TURBOPACK compile-time value", void 0)),
                "."
            ]
        }, void 0, true, {
            fileName: "[project]/pages/index.jsx",
            lineNumber: 10,
            columnNumber: 37
        }, ("TURBOPACK compile-time value", void 0)),
        copy: 'Send naira to any Nigerian bank or another Monica user instantly. Every transfer confirmed on screen.',
        image: '/app-screen-4.png',
        chips: [
            'Any bank, instant',
            'Free Monica → Monica',
            'Clear receipts'
        ]
    }
];
const faqs = [
    [
        'Is Monica legit?',
        'Yes. Monica is operated by Monica Technologies Limited, a Nigerian-registered company aligned with the SEC Virtual Asset Service Provider framework and NDPA data protection.'
    ],
    [
        'How fast does Monica pay out to my bank?',
        'Once your crypto deposit confirms onchain, naira credits to your Monica balance instantly. Bank withdrawals run over NIBSS instant transfer.'
    ],
    [
        'What does Monica charge to convert crypto to naira?',
        '0% on conversion and 0% on bank withdrawal. The only cost is the onchain network fee for sending your crypto.'
    ],
    [
        'Which coins and networks can I sell?',
        'Bitcoin, Ethereum, Solana, Tron and BNB, plus USDT and USDC across Bitcoin, ERC20, TRC20, BEP20, Solana and Base.'
    ],
    [
        'Do I need KYC to use Monica?',
        'Yes. Verification takes one screen with BVN or NIN plus a quick selfie, and is required for compliant bank withdrawals.'
    ]
];
function StoreButton({ platform }) {
    const isApple = platform === 'App Store';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].storeButton,
        href: isApple ? 'https://apps.apple.com/ng/app/monica-pay-send-bills/id6446216360' : 'https://play.google.com/store/apps/details?id=com.monicang',
        target: "_blank",
        rel: "noreferrer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].storeIcon,
                children: isApple ? '●' : '▶'
            }, void 0, false, {
                fileName: "[project]/pages/index.jsx",
                lineNumber: 24,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                        children: isApple ? 'Download on the' : 'Get it on'
                    }, void 0, false, {
                        fileName: "[project]/pages/index.jsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                        children: platform
                    }, void 0, false, {
                        fileName: "[project]/pages/index.jsx",
                        lineNumber: 25,
                        columnNumber: 69
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.jsx",
                lineNumber: 25,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.jsx",
        lineNumber: 23,
        columnNumber: 10
    }, this);
}
function Brand() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].brand,
        href: "#top",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                src: "/image.png",
                alt: ""
            }, void 0, false, {
                fileName: "[project]/pages/index.jsx",
                lineNumber: 30,
                columnNumber: 50
            }, this),
            "onica",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                children: ".cash"
            }, void 0, false, {
                fileName: "[project]/pages/index.jsx",
                lineNumber: 30,
                columnNumber: 86
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.jsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$InvoiceApp$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/pages/index.jsx",
        lineNumber: 35,
        columnNumber: 10
    }, this);
}
}),
"[project]/pages/index.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "accountMenu": "index-module__KWKY6G__accountMenu",
  "addItem": "index-module__KWKY6G__addItem",
  "authDisclaimer": "index-module__KWKY6G__authDisclaimer",
  "authError": "index-module__KWKY6G__authError",
  "authFooter": "index-module__KWKY6G__authFooter",
  "authForm": "index-module__KWKY6G__authForm",
  "authIntro": "index-module__KWKY6G__authIntro",
  "authPanel": "index-module__KWKY6G__authPanel",
  "authScreen": "index-module__KWKY6G__authScreen",
  "avatar": "index-module__KWKY6G__avatar",
  "bodyCopy": "index-module__KWKY6G__bodyCopy",
  "brand": "index-module__KWKY6G__brand",
  "brandDot": "index-module__KWKY6G__brandDot",
  "brandMark": "index-module__KWKY6G__brandMark",
  "breadcrumb": "index-module__KWKY6G__breadcrumb",
  "businessBlock": "index-module__KWKY6G__businessBlock",
  "businessMark": "index-module__KWKY6G__businessMark",
  "buttonPrimary": "index-module__KWKY6G__buttonPrimary",
  "buttonQuiet": "index-module__KWKY6G__buttonQuiet",
  "chips": "index-module__KWKY6G__chips",
  "coinRail": "index-module__KWKY6G__coinRail",
  "coinsSection": "index-module__KWKY6G__coinsSection",
  "contentGrid": "index-module__KWKY6G__contentGrid",
  "desktopNav": "index-module__KWKY6G__desktopNav",
  "downloadDial": "index-module__KWKY6G__downloadDial",
  "downloadSection": "index-module__KWKY6G__downloadSection",
  "editorActions": "index-module__KWKY6G__editorActions",
  "editorColumn": "index-module__KWKY6G__editorColumn",
  "editorPanel": "index-module__KWKY6G__editorPanel",
  "emptyClients": "index-module__KWKY6G__emptyClients",
  "emptyIcon": "index-module__KWKY6G__emptyIcon",
  "eyebrow": "index-module__KWKY6G__eyebrow",
  "facts": "index-module__KWKY6G__facts",
  "faqItem": "index-module__KWKY6G__faqItem",
  "faqList": "index-module__KWKY6G__faqList",
  "faqOpen": "index-module__KWKY6G__faqOpen",
  "faqSection": "index-module__KWKY6G__faqSection",
  "feature": "index-module__KWKY6G__feature",
  "featureList": "index-module__KWKY6G__featureList",
  "featureReverse": "index-module__KWKY6G__featureReverse",
  "footer": "index-module__KWKY6G__footer",
  "formGrid": "index-module__KWKY6G__formGrid",
  "formHeading": "index-module__KWKY6G__formHeading",
  "formSection": "index-module__KWKY6G__formSection",
  "fullField": "index-module__KWKY6G__fullField",
  "grid": "index-module__KWKY6G__grid",
  "header": "index-module__KWKY6G__header",
  "headerActions": "index-module__KWKY6G__headerActions",
  "headerScrolled": "index-module__KWKY6G__headerScrolled",
  "headingCount": "index-module__KWKY6G__headingCount",
  "headingSub": "index-module__KWKY6G__headingSub",
  "helpButton": "index-module__KWKY6G__helpButton",
  "hero": "index-module__KWKY6G__hero",
  "heroCopy": "index-module__KWKY6G__heroCopy",
  "heroMeta": "index-module__KWKY6G__heroMeta",
  "iconButton": "index-module__KWKY6G__iconButton",
  "invoiceApp": "index-module__KWKY6G__invoiceApp",
  "invoiceBrand": "index-module__KWKY6G__invoiceBrand",
  "invoiceLink": "index-module__KWKY6G__invoiceLink",
  "invoiceMain": "index-module__KWKY6G__invoiceMain",
  "invoicePaper": "index-module__KWKY6G__invoicePaper",
  "invoiceTable": "index-module__KWKY6G__invoiceTable",
  "itemHeaders": "index-module__KWKY6G__itemHeaders",
  "itemRow": "index-module__KWKY6G__itemRow",
  "labelOptional": "index-module__KWKY6G__labelOptional",
  "light": "index-module__KWKY6G__light",
  "menuButton": "index-module__KWKY6G__menuButton",
  "mobileNav": "index-module__KWKY6G__mobileNav",
  "navActive": "index-module__KWKY6G__navActive",
  "overline": "index-module__KWKY6G__overline",
  "page": "index-module__KWKY6G__page",
  "pageFooter": "index-module__KWKY6G__pageFooter",
  "pageHeading": "index-module__KWKY6G__pageHeading",
  "paidStatus": "index-module__KWKY6G__paidStatus",
  "paperDates": "index-module__KWKY6G__paperDates",
  "paperFooter": "index-module__KWKY6G__paperFooter",
  "paperItem": "index-module__KWKY6G__paperItem",
  "paperItemHead": "index-module__KWKY6G__paperItemHead",
  "paperLabel": "index-module__KWKY6G__paperLabel",
  "paperLogo": "index-module__KWKY6G__paperLogo",
  "paperNote": "index-module__KWKY6G__paperNote",
  "paperNumber": "index-module__KWKY6G__paperNumber",
  "paperParties": "index-module__KWKY6G__paperParties",
  "paperTop": "index-module__KWKY6G__paperTop",
  "paperTotal": "index-module__KWKY6G__paperTotal",
  "paperTotals": "index-module__KWKY6G__paperTotals",
  "phoneFrame": "index-module__KWKY6G__phoneFrame",
  "previewColumn": "index-module__KWKY6G__previewColumn",
  "previewHint": "index-module__KWKY6G__previewHint",
  "previewTop": "index-module__KWKY6G__previewTop",
  "primaryButton": "index-module__KWKY6G__primaryButton",
  "printButton": "index-module__KWKY6G__printButton",
  "progress": "index-module__KWKY6G__progress",
  "rateField": "index-module__KWKY6G__rateField",
  "recentHeading": "index-module__KWKY6G__recentHeading",
  "recentSection": "index-module__KWKY6G__recentSection",
  "removeItem": "index-module__KWKY6G__removeItem",
  "routeHighlight": "index-module__KWKY6G__routeHighlight",
  "routeList": "index-module__KWKY6G__routeList",
  "rowAction": "index-module__KWKY6G__rowAction",
  "sectionTitle": "index-module__KWKY6G__sectionTitle",
  "sentStatus": "index-module__KWKY6G__sentStatus",
  "sideBottom": "index-module__KWKY6G__sideBottom",
  "sideNav": "index-module__KWKY6G__sideNav",
  "sidebar": "index-module__KWKY6G__sidebar",
  "statGrid": "index-module__KWKY6G__statGrid",
  "statStrip": "index-module__KWKY6G__statStrip",
  "statusBadge": "index-module__KWKY6G__statusBadge",
  "statusSent": "index-module__KWKY6G__statusSent",
  "storeButton": "index-module__KWKY6G__storeButton",
  "storeIcon": "index-module__KWKY6G__storeIcon",
  "storeRow": "index-module__KWKY6G__storeRow",
  "syncStatus": "index-module__KWKY6G__syncStatus",
  "tableEmpty": "index-module__KWKY6G__tableEmpty",
  "tableHead": "index-module__KWKY6G__tableHead",
  "tableRow": "index-module__KWKY6G__tableRow",
  "tableStatus": "index-module__KWKY6G__tableStatus",
  "taxInput": "index-module__KWKY6G__taxInput",
  "textButton": "index-module__KWKY6G__textButton",
  "toast": "index-module__KWKY6G__toast",
  "topbar": "index-module__KWKY6G__topbar",
  "topbarRight": "index-module__KWKY6G__topbarRight",
  "viewAllButton": "index-module__KWKY6G__viewAllButton",
  "whySection": "index-module__KWKY6G__whySection",
  "workspaceLabel": "index-module__KWKY6G__workspaceLabel",
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20ka-jd._.js.map