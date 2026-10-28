// سما صاع v3 — زر العربي / English
// طبقة ترجمة فوق الواجهة: بعد كل رسم نبدّل النصوص اللي في القاموس. أسماء الناس والعقارات تبقى مثل ما هي.
(() => {
  const KEY = 'saa_lang';
  const lang = (() => { try { return localStorage.getItem(KEY) === 'en' ? 'en' : 'ar'; } catch { return 'ar'; } })();

  // ترجمة كاملة للنص (يطابق النص كله بعد التنظيف)
  const D = {
    // القائمة والصفحات
    'لوحة الأداء': 'Dashboard', 'الملاك والعقارات': 'Owners & properties', 'أملاكي': 'My properties', 'التنبيهات': 'Alerts', 'الصيانة': 'Maintenance',
    'المستأجرين': 'Tenants', 'التحصيل والكشف المالي': 'Collections & statements', 'الحسابات': 'Accounts', 'سجل التعديلات': 'Audit log', 'الإعدادات': 'Settings',
    'حسابي': 'My account', 'بحث': 'Search', 'بحث شامل': 'Global search', 'خروج': 'Log out', 'شقتي': 'My unit', 'التصميم': 'Design', 'الرئيسية': 'Home',
    'يومية التحصيل': 'Collections journal', 'الكشف المالي': 'Financial statement', 'الكشف المالي المفصّل': 'Detailed statement', 'الحسابات والصلاحيات': 'Accounts & permissions',
    'متابعة الصيانة': 'Maintenance tracking', 'استيراد البيانات': 'Import data', 'الكشوفات': 'Statements', 'لوحة العقار': 'Property dashboard', 'ملف الشقة': 'Unit file',
    'حساب المالك والتحويلات': 'Owner account & transfers', 'حسابي والتحويلات': 'My account & transfers', 'ملف المستأجر': 'Tenant file',
    // تسجيل الدخول
    'تسجيل الدخول': 'Sign in', 'اسم المستخدم': 'Username', 'كلمة المرور': 'Password', 'دخول': 'Sign in', 'إظهار': 'Show', 'إخفاء': 'Hide',
    'رمز التحقق': 'Verification code', 'الرمز من تطبيق المصادقة': 'Code from authenticator app', 'تأكيد الدخول': 'Confirm sign-in', 'إدارة العقارات': 'Property management',
    'تغيير كلمة المرور': 'Change password', 'تفعيل': 'Enable', 'التحقق بخطوتين': 'Two-step verification',
    // أزرار عامة
    'حفظ': 'Save', 'إلغاء': 'Cancel', 'تعديل': 'Edit', 'حذف': 'Delete', 'إغلاق': 'Close', 'تأكيد': 'Confirm', 'فتح': 'Open', 'طباعة': 'Print', 'طباعة / PDF': 'Print / PDF',
    'تصدير': 'Export', 'تصدير Excel (CSV)': 'Export Excel (CSV)', 'استيراد': 'Import', 'نعم، احذف': 'Yes, delete', 'تأكيد الحذف': 'Confirm delete', 'اعتماد': 'Approve', 'رفض': 'Reject',
    'جارِ التحميل…': 'Loading…', 'جارِ الحفظ…': 'Saving…', 'تم': 'Done', 'عرض كجدول': 'Show as table', 'عرض الكشف': 'View statement', 'أرسل الطلب': 'Send request',
    'إضافة عقار': 'Add property', '+ إضافة عقار': '+ Add property', 'إضافة مالك': 'Add owner', '+ إضافة مالك': '+ Add owner', 'إضافة شقة': 'Add unit', '+ إضافة شقة': '+ Add unit',
    '+ عقد جديد': '+ New contract', 'عقد جديد': 'New contract', 'تجديد العقد': 'Renew contract', 'إنهاء العقد': 'End contract', '+ إضافة استحقاق': '+ Add due', 'إضافة استحقاق': 'Add due',
    'تسجيل دفعة': 'Record payment', '+ تسجيل دفعة': '+ Record payment', 'رفع مرفق': 'Upload attachment', '+ رفع مرفق': '+ Upload attachment', 'رفع مستند': 'Upload document',
    '+ صورة/فاتورة': '+ Photo/invoice', 'طلب صيانة': 'Maintenance request', '+ طلب صيانة': '+ Maintenance request', 'تسجيل تحويل': 'Record transfer', '+ تسجيل تحويل': '+ Record transfer',
    '+ حركة تأمين': '+ Deposit movement', 'فتح للمحاسب': 'Unlock for accountant', '🔒 فتح للمحاسب': '🔒 Unlock for accountant', '🔒 مقفل': '🔒 Locked', 'مقفل': 'Locked',
    '+ مستأجر جديد': '+ New tenant', 'مستأجر جديد': 'New tenant', 'إنشاء الملفات': 'Create files', 'واتساب': 'WhatsApp', 'حساب جديد': 'New account', '+ حساب جديد': '+ New account',
    'عرض الإيصال': 'View receipt', 'اعتماد الإيصال': 'Approve receipt', 'رفض الإيصال': 'Reject receipt', 'تم التعامل معه': 'Handled', 'رد على المستأجر': 'Reply to tenant',
    'إيداع': 'Deposit', 'صرف': 'Clear', 'ارتجاع': 'Bounce', 'إيداع الشيك': 'Deposit cheque', 'صرف الشيك': 'Clear cheque', 'تعديل الشيك': 'Edit cheque', 'حذف الشيك': 'Delete cheque',
    'تحديث الدفع / التأخير': 'Update payment / delay', 'لوحة الصيانة': 'Maintenance board', 'عرض التحصيل': 'Show collections',
    // حقول وأعمدة
    'المبلغ': 'Amount', 'التاريخ': 'Date', 'المحصّل': 'Collected', 'المستأجر': 'Tenant', 'الشقة': 'Unit', 'المتبقي': 'Remaining', 'موعد الاستحقاق': 'Due date', 'الحالة': 'Status',
    'شيك': 'Cheque', 'المتأخر': 'Overdue', 'الطريقة': 'Method', 'المرجع': 'Reference', 'المالك': 'Owner', 'المدفوع': 'Paid', 'النوع': 'Type', 'الإجمالي': 'Total', 'العقار': 'Property',
    'نسبتنا': 'Our share', 'ملاحظة': 'Note', 'ملاحظات': 'Notes', 'المبلغ (درهم)': 'Amount (AED)', 'التكلفة': 'Cost', 'التكلفة (درهم)': 'Cost (AED)', 'عدد الدفعات': 'Payments',
    'الوصف': 'Description', 'الإيجار السنوي': 'Annual rent', 'الإيجار السنوي (درهم)': 'Annual rent (AED)', 'اسم المستأجر': 'Tenant name', 'بداية العقد': 'Contract start',
    'نهاية العقد': 'Contract end', 'مصاريف العقار': 'Property expenses', 'كل العقارات': 'All properties', 'الصافي للمالك': 'Net to owner', 'رقم توثيق العقد': 'Tawtheeq no.',
    'سند قبض': 'Receipt', 'سند القبض': 'Receipt', 'رقم الشيك': 'Cheque no.', 'البنك': 'Bank', 'تاريخ الدفع': 'Payment date', 'المستحق': 'Due', 'سند': 'Receipt',
    'نسبتنا (عمولة الإدارة)': 'Our share (management fee)', 'العقار — الشقة': 'Property — unit', 'استحقاق': 'Due', 'عمولة الإدارة': 'Management fee', 'الشقق': 'Units',
    'صيانة مفتوحة': 'Open maintenance', 'تحويل بنكي': 'Bank transfer', 'تحويل': 'Transfer', 'نقدي': 'Cash', 'نقداً': 'Cash', 'نقد': 'Cash', 'اسم المالك': 'Owner name', 'رقم التواصل': 'Phone',
    'طلبات الصيانة': 'Maintenance requests', 'رقم الشقة': 'Unit no.', 'تفاصيل الشقة': 'Unit details', 'التأخير': 'Delay', 'السبب': 'Reason', 'تاريخ الشيك': 'Cheque date',
    'الفني / المورد': 'Technician / vendor', 'المورد': 'Vendor', 'الملف': 'File', 'من تاريخ': 'From', 'إلى تاريخ': 'To', 'المصاريف': 'Expenses', 'الشهر': 'Month', 'التأمين': 'Deposit',
    'الإيجارات المحصّلة': 'Rent collected', 'دفعة': 'Payment', 'الاسم': 'Name', 'الدور': 'Role', 'الجوال': 'Mobile', 'الفترة': 'Period', 'المتأخرات': 'Arrears', 'العمولة': 'Fee',
    'الصافي': 'Net', 'اليوم': 'Today', 'العملية': 'Action', 'المستخدم': 'User', 'اسم العقار': 'Property name', 'المدينة': 'City', 'المنطقة': 'Area', 'عمولة الإدارة ٪': 'Management fee %',
    'طريقة الدفع': 'Payment method', 'وصف العمل': 'Work description', 'الأولوية': 'Priority', 'موعد الزيارة': 'Visit date', 'نوع الصيانة': 'Maintenance type', 'المسؤول': 'Assignee',
    'المسؤول عن المتابعة': 'Follow-up owner', 'اسم الفني أو المورد': 'Technician or vendor', 'تاريخ الطلب': 'Request date', 'مبلغ التأمين': 'Deposit amount', 'مبلغ التأمين (درهم)': 'Deposit (AED)',
    'جوال المستأجر': 'Tenant mobile', 'رقم التوثيق': 'Tawtheeq no.', 'الرصيد': 'Balance', 'الحركة': 'Movement', 'الخصم': 'Deduction', 'استلام': 'Received', 'استرداد': 'Refund',
    'زيادة عند التجديد': 'Top-up on renewal', 'ملف المستأجر': 'Tenant file', 'الشقة الحالية': 'Current unit', 'عدد العقود': 'Contracts', 'البريد الإلكتروني': 'Email', 'رقم الهوية': 'ID number',
    'العقود': 'Contracts', 'آخر الدفعات': 'Recent payments', 'من': 'From', 'إلى': 'To', 'سند ': 'Receipt', 'سجّله': 'Recorded by', 'التحويلات حتى اليوم': 'Transfers to date',
    'الباقي للمالك': 'Still owed to owner', 'دفتر التحويلات': 'Transfer ledger', 'ما فيه تحويلات مسجّلة': 'No transfers recorded', 'الصافي للملاك': 'Net to owners',
    'إجمالي الاستحقاقات': 'Total dues', 'إجمالي المدفوع': 'Total paid', 'استحقاقات الإيجار': 'Rent dues', 'سجل الدفعات': 'Payment history', 'المرجع / ملاحظة': 'Reference / note',
    'عدد الشقق': 'Units', 'المأجّر والشاغر': 'Rented & vacant', 'إجمالي الإيجارات السنوية': 'Total annual rent', 'آخر طلبات الصيانة': 'Latest maintenance', 'مستندات العقار': 'Property documents',
    'الشيكات': 'Cheques', 'سقف الصيانة': 'Maintenance cap', 'المصروف': 'Spent', 'بيانات الشقة والمستأجر': 'Unit & tenant details', 'العقد': 'Contract', 'العقود السابقة': 'Previous contracts',
    'مرفقات المستأجر والشقة': 'Tenant & unit attachments', 'طلبات المستأجر': 'Tenant requests', 'إيصالات التحويل من المستأجر': 'Tenant transfer receipts', 'ملاحظات المستأجر': 'Tenant notes',
    'المستحق والمحصّل شهرياً': 'Monthly due vs collected', 'الصافي للمالك شهرياً': 'Monthly net to owner', 'تكلفة الصيانة شهرياً': 'Monthly maintenance cost', 'أعمار المتأخرات': 'Arrears ageing',
    'الإشغال حسب العقار': 'Occupancy by property', 'آخر الحركات': 'Recent activity', 'العقار': 'Property', 'المحصّل في 2026': 'Collected in 2026', 'نسبة التحصيل': 'Collection rate',
    'نسبة الإشغال': 'Occupancy', 'المتأخر حتى اليوم': 'Overdue to date', 'إجمالي المتأخر حتى اليوم': 'Total overdue to date', 'مصاريف الشهر': 'This month’s expenses', 'آخر 6 أشهر': 'Last 6 months',
    'آخر 12 شهراً': 'Last 12 months', 'آخر 24 شهراً': 'Last 24 months', 'كل الشقق': 'All units', 'المتأخرون': 'Late', 'المدفوع بالكامل': 'Fully paid', 'الكل': 'All',
    'المستحق مقابل المحصّل هالسنة': 'Due vs collected this year', 'النسخ الاحتياطي': 'Backup', '⬇ نزّل نسخة احتياطية': '⬇ Download backup', '⬆ استرجع من ملف': '⬆ Restore from file',
    // حالات
    'شاغرة': 'Vacant', 'مأجّرة': 'Rented', 'جديد': 'New', 'قيد التنفيذ': 'In progress', 'مكتمل': 'Done', 'عاجل': 'Urgent', 'عادي': 'Normal', 'منخفض': 'Low', 'ساري': 'Active',
    'متأخر': 'Late', 'مدفوع': 'Paid', 'دفع جزئي': 'Partly paid', 'في الموعد': 'On time', 'تم الصرف': 'Cleared', 'مرتجع': 'Bounced', 'محفوظ لدينا': 'Held by us', 'مودَع في البنك': 'Deposited',
    'بانتظار الاعتماد': 'Awaiting approval', 'معتمد': 'Approved', 'مرفوض': 'Rejected', 'منجز': 'Completed', 'من المستأجر': 'From tenant', 'عقد ساري': 'Active contract',
    'بدون عقد ساري': 'No active contract', 'منتهي': 'Ended', 'انتهى بالتجديد': 'Ended by renewal', 'مفتوح لك مرة واحدة': 'Unlocked for you once', 'ما فيه طلبات': 'No requests',
    'لا توجد طلبات صيانة': 'No maintenance requests', 'لا توجد مرفقات': 'No attachments', 'لا توجد دفعات مسجلة': 'No payments recorded', 'لا توجد استحقاقات': 'No dues',
    'لا توجد متأخرات': 'No arrears', 'لا توجد مستندات': 'No documents', 'لا توجد ملاحظات': 'No notes', 'ما فيه دفعات': 'No payments', 'ما فيه نتائج': 'No results',
    // أنواع الصيانة والمستندات
    'تكييف': 'A/C', 'سباكة': 'Plumbing', 'كهرباء': 'Electrical', 'نجارة وأبواب': 'Carpentry & doors', 'دهان': 'Painting', 'أجهزة': 'Appliances', 'أخرى': 'Other',
    'سند الملكية': 'Title deed', 'وثيقة التأمين': 'Insurance policy', 'شهادة الدفاع المدني': 'Civil defence certificate', 'عقد الصيانة': 'Maintenance contract', 'رخصة': 'Licence', 'مستند آخر': 'Other document',
    // من جولة الفحص الثانية
    'سما صاع': 'Sama Saa', '| إدارة العقارات': '| Property management', 'أنت تستخدم كلمة المرور الافتراضية. غيّرها قبل إدخال بيانات حقيقية.': 'You are using the default password. Change it before entering real data.',
    'ننصح بتفعيل التحقق بخطوتين لحسابك لحماية الجوازات والإيصالات.': 'We recommend enabling two-step verification to protect passports and receipts.',
    'مأجّرة من': 'rented of', 'خسارة الشغور': 'Vacancy loss', 'الفرق': 'Difference', 'تكلفة الصيانة': 'Maintenance cost', 'الشقق الشاغرة': 'Vacant units', 'كل الشقق مأجّرة 👍': 'All units rented 👍',
    'المستحق حسب موعد الاستحقاق، والمحصّل حسب تاريخ الدفع الفعلي': 'Due by due date, collected by actual payment date', 'المحصّل − عمولة الإدارة − الصيانة − مصاريف العقار': 'Collected − management fee − maintenance − property expenses',
    'حسب تاريخ طلب الصيانة': 'By maintenance request date', 'المبالغ المتأخرة حسب مدة التأخير — الإجمالي': 'Overdue amounts by age — total', 'دفعة مستلمة': 'Payment received', 'شيك مرتجع': 'Bounced cheque',
    'شيك تم صرفه': 'Cheque cleared', 'تقييم الفنيين والموردين': 'Technician & vendor ratings', 'من تقييمات المستأجرين بعد إنجاز الصيانة': 'From tenant ratings after maintenance', 'الطلبات': 'Requests', 'التقييم': 'Rating',
    'بدون تقييم': 'Not rated', 'ابحث عن المالك أو افتح عقاراته': 'Find an owner or open their properties', '🔓 مفتوح للمحاسب — إعادة القفل': '🔓 Unlocked for accountant — relock', 'المستخدم': 'User',
    'الشقق': 'Units', 'صيانة مفتوحة': 'Open maintenance', '+ عقار لهذا المالك': '+ Property for this owner', 'شيكات حان إيداعها': 'Cheques due for deposit', 'بعد': 'in',
    'تذكير بالواتساب': 'WhatsApp reminder', 'مغطّى بشيكات': 'Covered by cheques', 'شيكات مرتجعة': 'Bounced cheques', 'رصيد غير كافٍ': 'Insufficient funds', 'متأخرات': 'Arrears', 'ينتهي بعد': 'Ends in',
    'إيصالات تحويل بانتظار الاعتماد': 'Transfer receipts awaiting approval', 'لا توجد إيصالات جديدة': 'No new receipts', 'طلبات المستأجرين (تجديد أو إخلاء)': 'Tenant requests (renewal or move-out)',
    'لا توجد طلبات جديدة': 'No new requests', 'منتهي منذ': 'Expired', 'نجارة': 'Carpentry', 'ملف لكل شخص يجمع عقوده ودفعاته حتى لو جدّد أو نقل شقة': 'One file per person with all contracts and payments, even after renewal or moving unit',
    'كل الطلبات من البلاغ لين الإقفال — اسحب البطاقة أو استخدم الأسهم لنقلها': 'Every request from report to close — drag a card or use the arrows to move it', 'قيد التنفيذ ←': 'In progress →', '→ جديد': '← New', 'مكتمل ←': 'Done →', '→ قيد التنفيذ': '← In progress',
    'كل المبالغ المستلمة بتاريخ الدفع الفعلي، مع أرقام سندات القبض': 'All amounts received by actual payment date, with receipt numbers', 'أمس': 'Yesterday', 'هذا الشهر': 'This month', 'عرض': 'Show',
    'إجمالي المحصّل': 'Total collected', 'من المجموع الكلي للمحصّل': 'of total collected', 'صافي الملاك': 'Owners’ net', 'لا توجد مبالغ مستلمة خلال الفترة': 'No amounts received in this period',
    'إدارة حسابات المدراء والمحاسب والملاك': 'Manage manager, accountant and owner accounts', 'الأدوار': 'Roles', 'مرتبط بـ': 'Linked to', 'المحاسب': 'Accountant', 'غير مفعّل': 'Not enabled', 'فعّال': 'Active',
    'سجلات مفتوحة للمحاسب حالياً': 'Records currently unlocked for accountant', 'كل عملية: مين سواها ومتى': 'Every action: who did it and when', 'الوقت': 'Time', 'السجل': 'Record', 'التفاصيل': 'Details',
    'إضافة': 'Add', 'صيانة': 'Maintenance', 'تحويل مالك': 'Owner transfer', 'تسجيل دخول': 'Sign-in', 'بيانات الشركة على السندات والكشوفات والرسائل، واستيراد وتصدير البيانات': 'Company details on receipts, statements and messages; data import and export',
    'بيانات الشركة': 'Company details', 'اسم الشركة': 'Company name', 'جوال الشركة (واتساب)': 'Company mobile (WhatsApp)', 'يظهر للمالك والمستأجر كزر «تواصل مع الإدارة»': 'Shown to owners and tenants as a “Contact management” button',
    'الرقم الضريبي': 'Tax number', 'العنوان': 'Address', 'توقيع رسائل الواتساب': 'WhatsApp signature', 'يُضاف في آخر كل رسالة واتساب': 'Added at the end of every WhatsApp message', 'ملاحظة أسفل السندات': 'Note under receipts',
    'حفظ الإعدادات': 'Save settings', 'استيراد من Excel': 'Import from Excel', 'تصدير البيانات': 'Export data', 'كل الشقق مع المستأجرين والعقود في ملف يفتح في Excel.': 'All units with tenants and contracts in a file that opens in Excel.',
    'تصدير الشقق (CSV)': 'Export units (CSV)', 'الاسترجاع يستبدل كل البيانات الحالية ويطلعك من الحساب.': 'Restoring replaces all current data and signs you out.',
    'البيانات محفوظة في هالمتصفح بس. نزّل نسخة بشكل دوري واحفظها في مكان آمن، عشان لو انمسح المتصفح أو تبي تنقل لجهاز ثاني.': 'Data is stored in this browser only. Download a copy regularly and keep it safe, in case the browser is cleared or you move to another device.',
    'كلمة المرور الحالية': 'Current password', 'كلمة المرور الجديدة': 'New password', '4 أحرف أو أرقام على الأقل': 'At least 4 letters or digits', 'حفظ كلمة المرور': 'Save password',
    'الصافي حسب العمولة الحالية والصيانة والمصاريف المسجّلة': 'Net using current fee, maintenance and recorded expenses', 'منتظم': 'Regular', 'مدفوع بالكامل': 'Fully paid', '🔧 صيانة مفتوحة': '🔧 Open maintenance',
    'مصاريف 2026': 'Expenses 2026', '+ مصروف': '+ Expense', 'نظافة': 'Cleaning', 'حارس': 'Guard', '+ رفع مستند': '+ Upload document', 'سند الملكية، التأمين، شهادة الدفاع المدني، عقود الصيانة — مع تنبيه قبل الانتهاء': 'Title deed, insurance, civil defence certificate, maintenance contracts — with a reminder before expiry',
    'ساري — ينتهي بعد': 'Valid — expires in', 'بدون تاريخ انتهاء': 'No expiry date', 'إنهاء العقد / إخلاء': 'End contract / move out', 'متبقي': 'left', 'مدة العقد': 'Contract term', 'السداد': 'Payment',
    'العقود السابقة': 'Previous contracts', 'انتهاء مدة العقد': 'Contract expired', 'المسترد': 'Refunded', 'سبب الخصم': 'Deduction reason', 'تاريخ الدفع الفعلي': 'Actual payment date', 'مستحق قادم': 'Upcoming',
    '+ شيك': '+ Cheque', '🧾 شيك': '🧾 Cheque', 'إرجاع لمحفوظ': 'Back to held', 'إيصال نقدي': 'Cash receipt', 'عدد الطلبات': 'Requests', 'المصروف': 'Spent', 'عقد الإيجار، الهوية، الجواز، الشيكات، الإيصالات — صور أو PDF': 'Lease, ID, passport, cheques, receipts — photos or PDF',
    'دفعات تستحق خلال 7 days': 'Payments due within 7 days', 'عقود تنتهي خلال 90 days': 'Contracts ending within 90 days', 'نسبتنا (عمولة الإدارة) في 2026': 'Our share (management fee) in 2026',
    'رقم تواصل المستأجر': 'Tenant phone', 'قيمة الإيجار السنوي (درهم)': 'Annual rent (AED)', 'يُحسب منه سقف الصيانة': 'Used to calculate the maintenance cap',
    'السجل مقفل على المحاسب': 'Record is locked for the accountant', 'تظهر في بطاقة الشقة ويقرأها المالك': 'Shown on the unit card and visible to the owner', 'ملاحظات المستأجر': 'Tenant notes',
    'شاغرة منذ': 'Vacant since', 'لحساب مدة الشغور وخسارة الإيجار في لوحة الأداء': 'Used for vacancy time and lost rent on the dashboard', 'مثال: غرفتان وصالة — الطابق 2': 'e.g. 2 bedrooms & hall — floor 2',
    'تعديل بيانات المستأجر': 'Edit tenant details', 'التعديل هنا ما يغيّر الاسم المكتوب في العقود والسندات القديمة.': 'Editing here does not change the name on old contracts and receipts.',
    'طلب صيانة جديد': 'New maintenance request', 'تعديل طلب الصيانة': 'Edit maintenance request', 'عقد جديد — شقة': 'New contract — unit', 'ملف المستأجر': 'Tenant file',
    'اختر ملف موجود إذا نفس الشخص جدّد أو نقل شقة': 'Pick an existing file if the same person renewed or moved unit', '— مستأجر جديد (ينسوّى له ملف تلقائي) —': '— New tenant (a file is created automatically) —',
    'استلمنا مبلغ التأمين فعلياً': 'We actually received the deposit', 'تاريخ استلام التأمين': 'Deposit received date', 'مرجع استلام التأمين': 'Deposit reference', 'استلمنا شيكات مؤجلة لكل الدفعات': 'We received post-dated cheques for all payments',
    'رقم أول شيك': 'First cheque no.', 'بقية الشيكات تُرقَّم بالتسلسل': 'The rest are numbered in sequence', 'اتركه فارغاً = سنة كاملة': 'Leave empty = one full year', 'جدول الدفعات': 'Payment schedule',
    'حفظ العقد وإنشاء الدفعات': 'Save contract & create payments', 'تجديد وإنشاء الدفعات': 'Renew & create payments', 'ملاحظات': 'Notes',
    // الأدوار
    'مدير المكتب': 'Office manager', 'مدير القسم': 'Department manager', 'محاسب': 'Accountant', 'مالك': 'Owner', 'مستأجر': 'Tenant', 'الإدارة': 'Management',
  };
  // أجزاء تتبدّل داخل أي نص (تواريخ، عملة، شقة)
  const PARTS = [
    [/يناير/g, 'Jan'], [/فبراير/g, 'Feb'], [/مارس/g, 'Mar'], [/أبريل/g, 'Apr'], [/مايو/g, 'May'], [/يونيو/g, 'Jun'], [/يوليو/g, 'Jul'], [/أغسطس/g, 'Aug'],
    [/سبتمبر/g, 'Sep'], [/أكتوبر/g, 'Oct'], [/نوفمبر/g, 'Nov'], [/ديسمبر/g, 'Dec'],
    [/(^|\s)درهم(?=\s|$|[.,)])/g, '$1AED'], [/(^|\s)شقة(?=\s)/g, '$1Unit'], [/(^|\s)بناية(?=\s)/g, '$1Building'],
    [/حتى (\d)/g, 'up to $1'], [/يوماً/g, 'days'], [/يومين/g, 'days'], [/يوم(?=\s|$)/g, 'day'], [/أيام/g, 'days'], [/شهراً/g, 'months'], [/أشهر/g, 'months'],
    [/باقي (.+) درهم ما انحصّلت/g, '$1 AED not yet collected'], [/باقي (.+) AED ما انحصّلت/g, '$1 AED not yet collected'],
    [/^من أصل (.+) مستحقة هذه السنة$/g, 'of $1 due this year'], [/^كل العقارات · حتى (.+)$/g, 'All properties · to $1'],
    [/^آخر نسخة: /g, 'Last backup: '], [/ما انسوّت نسخة للحين/g, 'no backup yet'],
    [/^الإدارة · /g, 'Management · '], [/ · مدير المكتب$/g, ' · Office manager'], [/ · مدير القسم$/g, ' · Department manager'],
    [/(\d[\d.,]*) ألف/g, '$1K'], [/٪/g, '%'], [/أكثر من (\d+)/g, 'over $1'], [/كل السجلات /g, 'All records '], [/(^|\s)بناية(?=\s|$)/g, '$1Building'],
    [/^الدفعة (\d+) من (\d+)$/g, 'Payment $1 of $2'], [/^استحقاق (.+)$/g, 'Due $1'], [/ · دُفعت /g, ' · paid '], [/ · نقد · /g, ' · cash · '], [/ · تحويل بنكي · /g, ' · bank transfer · '],
    [/ · شيك · /g, ' · cheque · '], [/شيك رقم/g, 'Cheque no.'], [/(^|· )تاريخه /g, '$1dated '], [/^الانتهاء: /g, 'Expiry: '], [/^دفتر التأمين — /g, 'Deposit ledger — '], [/ · الرصيد$/g, ' · balance'],
    [/^ما يحتاج متابعة اليوم، /g, 'Needs follow-up today, '], [/^مستندات العقار: منتهية أو تنتهي خلال (\d+) days$/g, 'Property documents: expired or expiring within $1 days'],
    [/ في (\d{1,2}:\d{2}) م$/g, ' at $1 PM'], [/ في (\d{1,2}:\d{2}) ص$/g, ' at $1 AM'], [/^حساب /g, 'Account: '], [/^سند ملكية /g, 'Title deed '], [/^دفعات مسددة ·$/g, 'payments made ·'],
    [/^— للفترة (.+) إلى (.+)$/g, '— for $1 to $2'], [/^سقف الصيانة \((\d+)% من الإيجار السنوي\)$/g, 'Maintenance cap ($1% of annual rent)'], [/^سقف الصيانة \((\d+)٪ من الإيجار السنوي\)$/g, 'Maintenance cap ($1% of annual rent)'],
    [/^\((\d+) مفتوحة\)$/g, '($1 open)'], [/ — تمت التسوية$/g, ' — settled'], [/^AED · خصم$/g, 'AED · deducted'], [/^AED من$/g, 'AED of'], [/^AED · شيك$/g, 'AED · cheque'],
    [/^تعديل شقة (.+) والمستأجر$/g, 'Edit unit $1 & tenant'], [/^تعديل Unit (.+) والمستأجر$/g, 'Edit unit $1 & tenant'], [/^عقد جديد — Unit (.+)$/g, 'New contract — unit $1'], [/^تجديد عقد Unit (.+)$/g, 'Renew contract — unit $1'],
    [/^طُبع بواسطة: /g, 'Printed by: '], [/^مالك: /g, 'Owner: '], [/^المالك: /g, 'Owner: '], [/ · المالك: /g, ' · Owner: '],
  ];
  // ---------- إضافات v3 (فحص 2026-10-28): نصوص كانت تطلع حروف إنجليزية بدل ترجمة على الأجهزة اللي ما فيها مترجم Chrome ----------
  Object.assign(D, {
    'التقويم': 'Calendar', 'شقة شاغرة': 'vacant unit', 'باقي': 'Remaining', 'فيه': 'There are', 'طلب': 'request', 'مصروف': 'expense', 'سندان': 'receipts', 'سندات': 'receipts', 'سنداً': 'receipts', 'طلبان': 'requests', 'طلبات': 'requests', 'طلباً': 'requests', 'مصروفان': 'expenses', 'مصروفات': 'expenses', 'مصروفاً': 'expenses', 'عقار': 'Property', 'شقة': 'Unit',
    '— اختر المالك —': '— Choose owner —', '+ مالك جديد…': '+ New owner…', 'بيانات المالك الجديد': 'New owner details', 'تُخصم من المحصّل في كشف حساب المالك': 'Deducted from collections in the owner statement',
    'تعديل بيانات المالك': 'Edit owner details', '🔒 السجل مقفل على المحاسب': '🔒 Record locked for the accountant', 'تم منح المحاسب صلاحية تعديل هذا السجل مرة واحدة': 'The accountant can now edit this record once',
    '🔓 هذا السجل مفتوح للمحاسب ليعدّله مرة واحدة': '🔓 This record is open for the accountant to edit once', 'تم سحب الصلاحية وإعادة قفل السجل': 'Permission removed and record locked again', 'إعادة قفل': 'Lock again',
    // التنبيهات والتقويم
    'دفعات تستحق خلال 7 أيام': 'Payments due within 7 days', 'عقود تنتهي خلال 90 يوماً': 'Contracts ending within 90 days',
    'الدفعات والشيكات والصيانة ونهاية العقود في مكان واحد': 'Payments, cheques, maintenance and contract ends in one place',
    '‹ السابق': '‹ Previous', 'هالشهر': 'This month', 'التالي ›': 'Next ›', 'دفعات': 'Payments', 'متأخرة': 'Overdue', 'شيكات': 'Cheques', 'صيانة · عقود تنتهي': 'Maintenance · contracts ending',
    'دفعة متأخرة': 'Overdue payment', 'دفعة مدفوعة': 'Paid payment', 'سبت': 'Sat', 'أحد': 'Sun', 'إثنين': 'Mon', 'ثلاثاء': 'Tue', 'أربعاء': 'Wed', 'خميس': 'Thu', 'جمعة': 'Fri',
    'مواعيد': 'Schedule', 'ما فيه مواعيد في هاليوم': 'Nothing scheduled on this day', 'اختر يوم': 'Pick a day', 'تم نقل الطلب': 'Request moved',
    // المستأجرين
    'عقد ما له ملف مستأجر. نقدر نسوي ملفات منها: العقود اللي اسمها وجوالها متطابقين بالضبط تنجمع بملف واحد.': 'contracts without a tenant file. We can create files from them: contracts with exactly the same name and mobile are grouped into one file.',
    'ما فيه ملفات مستأجرين للحين': 'No tenant files yet', 'إنشاء ملفات من العقود': 'Create files from contracts',
    'بننشئ ملف لكل اسم+جوال متطابقين بالضبط ونربط عقودهم. الأسماء المتشابهة (مثل اختلاف حرف) تبقى ملفات منفصلة وتراجعها أنت.': 'We will create one file per exact name + mobile match and link their contracts. Similar names (e.g. one letter different) stay as separate files for you to review.',
    // الكشوفات والتحصيل
    'آخر 7 أيام': 'Last 7 days', 'الشهر الماضي': 'Last month', 'آخر 3 أشهر': 'Last 3 months', 'من بداية السنة': 'Year to date', 'كل الملاك': 'All owners', 'سما صاع للعقارات': 'Sama Saa Real Estate',
    'الإيجارات المحصّلة ونسبتنا والصيانة والحراس وكل مصاريف العقارات': 'Collected rents, our commission, maintenance, guards and all property expenses',
    'الصيانة والمصاريف': 'Maintenance & expenses', 'الملخص': 'Summary', '· حسب نسبة كل مالك': "· by each owner's rate", 'حسب العقار': 'By property', 'حسب المالك': 'By owner', 'النسبة': 'Rate',
    'الصافي للملاك (المحصّل − نسبتنا − الصيانة − المصاريف)': 'Net to owners (collected − our commission − maintenance − expenses)',
    'لا توجد تكاليف صيانة خلال الفترة': 'No maintenance costs in this period', 'المورد / الجهة': 'Vendor / payee', 'السند': 'Receipt',
    'إرسال الكشف للمالك عبر واتساب': 'Send statement to owner via WhatsApp', 'كشف الإيجارات': 'Rent statement', 'قيمة الإيجار': 'Rent', 'تاريخ البداية': 'Start date', 'تاريخ النهاية': 'End date',
    'حالة الوحدة': 'Unit status', '(مسدد': '(paid', 'الإجمالي —': 'Total —', 'مأجّرة و': 'rented and ',
    'بنك أبوظبي التجاري': 'Abu Dhabi Commercial Bank', 'بنك أبوظبي الأول': 'First Abu Dhabi Bank', 'مصرف أبوظبي الإسلامي': 'Abu Dhabi Islamic Bank',
    'بنك الإمارات دبي الوطني': 'Emirates NBD', 'بنك دبي الإسلامي': 'Dubai Islamic Bank', 'بنك المشرق': 'Mashreq Bank', 'مصرف الإمارات الإسلامي': 'Emirates Islamic',
    'كهرباء ومياه المناطق المشتركة': 'Common-area electricity & water', 'فاتورة كهرباء ومياه المناطق المشتركة': 'Common-area electricity & water bill',
    'كل العقارات': 'All properties', 'تحويل بنكي': 'Bank transfer', 'المحصّل خلال الفترة': 'Collected in period', 'المستحق خلال الفترة': 'Due in period',
    'صيانة الفترة': 'Maintenance in period', 'كشف حساب المالك': 'Owner statement', 'يُخصم: عمولة الإدارة (': 'Less: management commission (', 'يُخصم: تكاليف الصيانة خلال الفترة': 'Less: maintenance costs in period',
    'يُخصم: مصاريف العقار خلال الفترة': 'Less: property expenses in period', 'الصافي المستحق للمالك': 'Net due to owner', 'استحقاقات الفترة': 'Dues in period', 'الموعد': 'Due date',
    'المتأخرات حتى تاريخه': 'Arrears to date', 'مدة التأخير': 'Days late', 'الصيانة (طلبات الفترة والمفتوحة)': 'Maintenance (period and open requests)', 'فواتير': 'Invoices',
    'الشيكات والإيصالات المرفوعة خلال الفترة': 'Cheques and receipts uploaded in period', 'لا توجد مرفقات شيكات أو إيصالات خلال الفترة': 'No cheque or receipt attachments in this period',
    // سند القبض
    'رقم:': 'No.:', 'رقم': 'No.', 'استلمنا من السيد/ة': 'Received from Mr./Ms.', 'مبلغ وقدره': 'The sum of', 'المبلغ كتابةً': 'Amount in words', 'وذلك عن': 'For',
    'التوقيع': 'Signature', 'الختم': 'Stamp', 'إرسال للمستأجر على الواتساب': 'Send to tenant on WhatsApp', 'نقداً — إيصال نقدي': 'Cash — cash receipt',
    // الحسابات
    'مدير المكتب ومدير القسم: صلاحيات كاملة · المحاسب: يُدخل كل شيء ويُقفل السجل بعد الإرسال، والتعديل بصلاحية من المدير · المالك: يشاهد أملاكه ويرسل الكشوفات لنفسه · المستأجر: يشاهد دفعاته ويطلب الصيانة':
      'Office & department managers: full access · Accountant: enters everything and the record locks after saving; edits need a manager’s permission · Owner: views own properties and sends statements to self · Tenant: views own payments and requests maintenance',
    'يقبل العربي، مثل: مالك٤ أو مستأجر٥': 'Arabic usernames are accepted (e.g. owner4, tenant5)', 'الاسم الظاهر': 'Display name', 'رقم الجوال (واتساب)': 'Mobile (WhatsApp)',
    'لمدير المكتب ومدير القسم: تصلهم طلبات الصيانة من المستأجرين': "For office & department managers: they receive tenants' maintenance requests",
    'مدير المكتب — صلاحيات كاملة': 'Office manager — full access', 'مدير القسم — صلاحيات كاملة': 'Department manager — full access', 'محاسب — إدخال مرة واحدة': 'Accountant — single entry',
    'مالك — مشاهدة فقط': 'Owner — view only', 'مستأجر — دفعاته وطلب الصيانة': 'Tenant — own payments and maintenance requests', 'المالك المرتبط': 'Linked owner', '— اختر —': '— Choose —',
    'شقة المستأجر': "Tenant's unit", '— اختر الشقة —': '— Choose unit —',
    'حفظ حساب المستأجر يربطه بالعقد الساري للشقة المختارة. تأكد أن العقد يخص صاحب الحساب': 'Saving a tenant account links it to the active contract of the selected unit. Make sure the contract belongs to the account holder',
    'كلمة مرور جديدة (اتركها فارغة بدون تغيير)': 'New password (leave empty to keep)', 'الحساب فعّال (أزل العلامة لتعطيله)': 'Account active (untick to disable)',
    // الإعدادات والحساب
    'تم حفظ إعدادات الشركة': 'Company settings saved', 'مثال: هذا السند لا يُعتد به إلا بعد صرف الشيك': 'e.g. This receipt is valid only after the cheque clears',
    'ارفع ملف Excel أو CSV فيه الملاك والعقارات والشقق والمستأجرين. يعرض لك النظام معاينة بالأخطاء قبل الحفظ، وينشئ العقود وجداول الدفعات تلقائياً.': 'Upload an Excel or CSV file with owners, properties, units and tenants. The system shows a preview with errors before saving, and creates contracts and payment schedules automatically.',
    'آخر نسخة:': 'Last backup:', 'كلمة المرور الحالية غير صحيحة': 'Current password is incorrect',
    // ملف الشقة
    'قيمة الإيجار السنوي': 'Annual rent', 'تم الدفع متأخراً': 'Paid late', 'تم الدفع': 'Paid', 'لم يدفع': 'Not paid', 'إيصال': 'Receipt', 'الهوية': 'ID', 'صورة الهوية': 'ID copy', 'عقد الإيجار': 'Lease contract',
    'ما فيه حركات مسجّلة. مبلغ التأمين في العقد ما يعتبر إثبات استلام؛ سجّل الاستلام الفعلي بعد التحقق.': 'No movements recorded. The deposit in the contract is not proof of receipt; record the actual receipt after checking.',
    'درهم) ينتقل للعقد الجديد.': 'AED) carries over to the new contract.', 'دفعة واحدة': '1 payment', 'دفعتان': '2 payments', '12 دفعة (شهري)': '12 payments (monthly)',
    'استلمنا فرق التأمين عن الرصيد المرحّل فعلياً': 'We actually received the deposit difference over the carried balance', 'تسجيل حركة تأمين': 'Record deposit movement',
    'الرصيد المسجّل:': 'Recorded balance:', 'درهم. الحركة تنحفظ في دفتر العقد.': 'AED. The movement is saved in the contract ledger.', 'خصم': 'Deduction', 'ملاحظة / سبب الخصم': 'Note / deduction reason',
    'تعليم الاستحقاق كمتأخر': 'Mark the due as late', 'إضافة دفعة بمبلغ وتاريخ': 'Add a payment with amount and date', 'إلغاء الدفعات المسجلة بالخطأ': 'Cancel payments recorded by mistake',
    'مبلغ الدفعة (درهم)': 'Payment amount (AED)', 'المرجع أو الملاحظة': 'Reference or note', 'سيتم إلغاء': 'This will cancel', 'دفعة (': 'payment(s) (',
    'درهم) وإرجاع الاستحقاق إلى «لم يدفع». موعد الاستحقاق الأصلي لن يتغير.': 'AED) and return the due to “Not paid”. The original due date will not change.',
    'سيظهر الاستحقاق كمتأخر. موعد الاستحقاق الأصلي لن يتغير.': 'The due will show as late. The original due date will not change.', 'تنفيذ': 'Apply',
    'سيتم إلغاء الدفعة المسجلة من هذا الشيك ويعود المبلغ متبقياً على المستأجر.': 'The payment recorded from this cheque will be cancelled and the amount becomes due from the tenant again.',
    'تاريخ الارتجاع': 'Return date', 'سبب الارتجاع': 'Return reason', 'إرجاع الشيك إلى «محفوظ لدينا»': 'Return cheque to “Held by us”', 'سيتم إلغاء الدفعة المسجلة من هذا الشيك.': 'The payment recorded from this cheque will be cancelled.',
    // ملف العقار
    'بطاقات': 'Cards', 'العمارة': 'Building', 'تعديل العقار': 'Edit property', 'تسجيل مصروف للعقار': 'Record property expense', 'نوع المصروف': 'Expense type',
    'رسوم وخدمات حكومية': 'Government fees & services', 'إصلاحات عامة للمبنى': 'General building repairs', 'رفع مستند للعقار': 'Upload property document', 'نوع المستند': 'Document type',
    'اسم المستند (اختياري)': 'Document name (optional)', 'تاريخ الانتهاء (اختياري)': 'Expiry date (optional)', 'ينبهك النظام قبل الانتهاء بـ30 يوماً': 'You will be alerted 30 days before expiry',
    'مصاريف المبنى العامة (كهرباء المناطق المشتركة، حارس، نظافة، رسوم). تُخصم من صافي المالك في الكشف.': "General building expenses (common-area electricity, guard, cleaning, fees). Deducted from the owner's net in the statement.",
    'صور (JPG, PNG) أو PDF — حتى 4 ميجابايت للملف. صور الجواز والهوية تُضاف لها علامة مائية تلقائياً': 'Images (JPG, PNG) or PDF — up to 4 MB per file. Passport and ID images get a watermark automatically',
    'رفع': 'Upload', 'إذا لم يظهر الملف، فبعض المتصفحات لا تعرض PDF داخل الصفحة في النسخة التجريبية.': "If the file doesn't show, some browsers can't display PDFs inside the page in the demo.",
    'تسجيل تحويل للمالك': 'Record transfer to owner',
    // بطاقة المحصّل مقابل المستحق (theme.js)
    'المحصّل من مستحق السنة كاملة': "Collected of the full year's dues", 'درهم:': 'AED:', 'متأخر، و': 'overdue, and', 'ما حل موعده للحين': 'not due yet',
    'المستحق': 'Due', 'المحصّل': 'Collected',
    // الصفحة الأولى (landing.js)
    'تخطّي': 'Skip', 'عقارك': 'Your property', 'أمانة…': 'is a trust…', 'ونحن': 'and we', 'أهلها': 'keep it',
    'سما صاع للعقارات': 'Sama Saa Real Estate', 'دخول النظام': 'Sign in to system', 'بوابة الملاك': 'Owners portal', 'الرجوع للنظام': 'Back to system', 'الصفحة الأولى': 'Home page',
    'شريككم في إدارة وتأجير وبيع وشراء وتقييم العقارات في دولة الإمارات': 'Your partner in managing, renting, selling, buying and valuing property in the UAE',
    'نهتم بعقاراتكم كأنها عقاراتنا: نتابع المستأجرين والتحصيل والصيانة، ونرسل للمالك كشفاً واضحاً كل شهر. ونساعدكم في البيع والشراء والتقييم بخبرة في سوق العين وأبوظبي.': 'We care for your properties as if they were our own: we follow up tenants, collections and maintenance, and send the owner a clear statement every month. We also help you sell, buy and value property with experience in the Al Ain and Abu Dhabi markets.',
    'إدارة العقارات': 'Property management', 'تأجير العقارات': 'Property rental', 'بيع العقارات': 'Sell property', 'شراء العقارات': 'Buy property', 'تقييم العقارات': 'Property valuation',
    'نظامنا لإدارة الملاك والعقارات والعقود والتحصيل والصيانة والكشوفات': 'Our system for owners, properties, contracts, collections, maintenance and statements',
    'نأجّر عقارك أو نلقى لك العقار المناسب للإيجار': 'We rent out your property or find you the right one to rent',
    'نسوّق عقارك ونوصله للمشتري المناسب': 'We market your property and reach the right buyer',
    'نلقى لك العقار أو الأرض حسب ميزانيتك': 'We find you a property or land that fits your budget',
    'تقييم عادل لقيمة عقارك أو أرضك في السوق': 'A fair market valuation of your property or land',
    'عقارات مكتملة': 'Completed properties', 'عقارات تحت الإنشاء': 'Off-plan / under construction', 'الأراضي': 'Land',
    'جاهزة للسكن أو الاستخدام': 'Ready to move in or use', 'على الخارطة أو قيد البناء': 'Off-plan or being built', 'سكنية وتجارية واستثمارية': 'Residential, commercial and investment',
    'اختر نوع العقار': 'Choose the property type', 'عبّ البيانات ونتواصل معك': 'Fill in the details and we will contact you',
    'نوع العقار': 'Property type', 'المنطقة': 'Area', 'المساحة (قدم²) — اختياري': 'Size (sq ft) — optional', 'مساحة الأرض (قدم²)': 'Land size (sq ft)',
    'الميزانية (درهم)': 'Budget (AED)', 'السعر المتوقع (درهم)': 'Expected price (AED)', 'تبي': 'You want to', 'الغرض من التقييم': 'Valuation purpose',
    'الاسم': 'Name', 'رقم الجوال': 'Mobile number', 'ملاحظات — اختياري': 'Notes — optional', 'إرسال الطلب على الواتساب': 'Send request on WhatsApp',
    'أستأجر عقار': 'Rent a property', 'أأجّر عقاري': 'Rent out my property', 'تمويل بنكي': 'Bank financing', 'ورثة / قسمة': 'Inheritance / division', 'غير ذلك': 'Other',
    'فيلا': 'Villa', 'بناية': 'Building', 'محل / مكتب': 'Shop / office', 'مشروع كامل': 'Whole project', 'محل': 'Shop', 'مكتب': 'Office',
    'سكنية': 'Residential', 'تجارية': 'Commercial', 'استثمارية': 'Investment', 'صناعية': 'Industrial', 'بيع': 'Sale', 'شراء': 'Purchase',
    'العين': 'Al Ain', 'أبوظبي': 'Abu Dhabi', 'دبي': 'Dubai', 'الشارقة': 'Sharjah',
    'اكتب الاسم': 'Enter your name', 'اكتب رقم جوال صحيح': 'Enter a valid mobile number',
    'تم تجهيز طلبك': 'Your request is ready', 'تم استلام طلبك (تجريبي)': 'Request received (demo)',
    'انفتح الواتساب برسالة جاهزة، اضغط إرسال فيه.': 'WhatsApp opened with a ready message, press Send there.',
    'رقم الواتساب ما انضاف للحين، هذا ملخّص طلبك:': 'The WhatsApp number is not added yet. Here is your request summary:',
    'الرجوع للصفحة الأولى': 'Back to home', 'تواصل معنا': 'Contact us', 'واتساب': 'WhatsApp', 'اتصال': 'Call', 'إيميل': 'Email', 'موقعنا': 'Our location',
    'العين — الإمارات العربية المتحدة': 'Al Ain — United Arab Emirates', 'معلومات التواصل تنضاف قريباً': 'Contact details coming soon',
    // شاشة أول تشغيل (اختيار كلمة مرور المدير)
    'أول تشغيل': 'First run', 'سما صاع | إدارة العقارات': 'Sama Saa | Property management', 'تأكيد كلمة المرور': 'Confirm password', 'ابدأ': 'Start',
    'اختر كلمة مرور المدير. تنطبق على كل الحسابات (ادمن، محاسب، مالك1…) وتقدر تغيّرها بعدين من «حسابي». تنحفظ في هالمتصفح بس.': 'Choose the manager password. It applies to all accounts (admin, accountant, owner1…) and you can change it later from “My account”. It is saved in this browser only.',
    'كلمة المرور لازم تكون 6 خانات على الأقل': 'Password must be at least 6 characters', 'اختر كلمة مرور أصعب': 'Choose a stronger password', 'كلمتين المرور مب متطابقتين': 'The two passwords do not match',
    'جارِ تجهيز سما صاع…': 'Preparing Sama Saa…',
    'تحميل PDF': 'Download PDF', 'جارِ تجهيز الـ PDF…': 'Preparing PDF…', 'تم تحميل الـ PDF': 'PDF downloaded', 'انلغى التحميل': 'Download cancelled',
  });
  // المبلغ كتابةً في السند: نحوّل الكلمات العربية لرقم ثم لكلمات إنجليزية
  const AR_NUM = { 'واحد': 1, 'اثنان': 2, 'اثنا': 2, 'اثنين': 2, 'ثلاثة': 3, 'أربعة': 4, 'خمسة': 5, 'ستة': 6, 'سبعة': 7, 'ثمانية': 8, 'تسعة': 9, 'عشرة': 10, 'أحد': 1, 'إحدى': 1,
    'عشرون': 20, 'ثلاثون': 30, 'أربعون': 40, 'خمسون': 50, 'ستون': 60, 'سبعون': 70, 'ثمانون': 80, 'تسعون': 90,
    'مائة': 100, 'مئة': 100, 'مائتان': 200, 'مائتا': 200, 'ثلاثمائة': 300, 'أربعمائة': 400, 'خمسمائة': 500, 'ستمائة': 600, 'سبعمائة': 700, 'ثمانمائة': 800, 'تسعمائة': 900 };
  function arWordsToNum(s) {
    let total = 0, cur = 0;
    for (let w of s.split(/\s+/)) {
      w = w.replace(/^و(?=.)/, '').replace(/[ًٌٍ]/g, '');
      if (w === 'عشر') { cur += 10; continue; }
      if (/^(ألف|ألفا|آلاف|ألفان|ألفين)$/.test(w)) { total += (w === 'ألفان' || w === 'ألفين' ? 2 : (cur || 1)) * 1000; cur = 0; continue; }
      if (/^(مليون|ملايين)$/.test(w)) { total += (cur || 1) * 1e6; cur = 0; continue; }
      if (AR_NUM[w] == null) return null;
      cur += AR_NUM[w];
    }
    return total + cur;
  }
  const EN1 = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const EN10 = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const en3 = n => [n >= 100 ? EN1[Math.floor(n / 100)] + ' hundred' : '', n % 100 < 20 ? EN1[n % 100] : EN10[Math.floor(n % 100 / 10)] + (n % 10 ? '-' + EN1[n % 10] : '')].filter(Boolean).join(' and ');
  const numToEn = n => n === 0 ? 'zero' : [n >= 1e6 ? en3(Math.floor(n / 1e6)) + ' million' : '', n % 1e6 >= 1000 ? en3(Math.floor(n % 1e6 / 1000)) + ' thousand' : '', en3(n % 1000)].filter(Boolean).join(' ');
  PARTS.unshift(
    [/^(.+) درهم فقط لا غير$/g, (m, w) => { const n = arWordsToNum(w); return n == null ? m : numToEn(n)[0].toUpperCase() + numToEn(n).slice(1) + ' dirhams only'; }],
    [/^كل السجلات حتى (.+) · الصافي حسب العمولة الحالية والصيانة والمصاريف المسجّلة$/g, 'All records to $1 · net by current commission, maintenance and recorded expenses'],
    [/^العقد الحالي ينتهي (.+)\. عند الحفظ يُغلق ويبدأ العقد الجديد، والرصيد المسجّل \($/g, 'The current contract ends $1. On save it closes and the new contract starts, and the recorded balance ('],
    [/^سقف الصيانة \((\d+)[٪%] من الإيجار السنوي\):$/g, 'Maintenance cap ($1% of annual rent):'], [/^يُحسب منه سقف الصيانة \((\d+)[٪%]\)$/g, 'Used to calculate the maintenance cap ($1%)'],
    [/^تسديد المتبقي \((.+) درهم\) بتاريخ تختاره$/g, 'Pay the remaining ($1 AED) on a date you choose'],
    [/^تفصيل الصيانة \((\d+)\)$/g, 'Maintenance details ($1)'], [/^تفصيل المصاريف: الحراس والنظافة والكهرباء وغيرها \((\d+)\)$/g, 'Expense details: guards, cleaning, electricity, etc. ($1)'],
    [/^تفصيل الإيجارات المحصّلة \((\d+)\)$/g, 'Collected rent details ($1)'], [/^الدفعات المحصّلة \((\d+)\) — منها شيكات: (\d+)$/g, 'Collected payments ($1) — cheques: $2'],
    [/^دفع جزئي — متأخر \((\d+) (?:يوماً|أيام|يومين|يوم)\)$/g, (m, n) => `Partial — late (${n} day${n === '1' ? '' : 's'})`],
    [/^متأخر \((\d+) (?:يوماً|أيام|يومين|يوم)\)$/g, (m, n) => `Late (${n} day${n === '1' ? '' : 's'})`],
  );
  PARTS.push(
    [/^سند قبض رقم (\d+)$/g, 'Receipt no. $1'], [/^سند قبض (\d+)$/g, 'Receipt $1'], [/^التاريخ: /g, 'Date: '], [/^المستلم: /g, 'Received by: '], [/^أصدره: /g, 'Issued by: '], [/^تاريخ الإصدار: /g, 'Issue date: '],
    [/^إيجار (.+)، دفعة استحقاق (.+)$/g, 'Rent $1, payment due $2'], [/^كشف (?=بناية|Building)/g, 'Statement — '], [/^من (.+) إلى (.+) · /g, 'From $1 to $2 · '], [/ · حتى /g, ' · to '],
    [/^عقار: /g, 'Property: '], [/^شقة — /g, 'Unit — '], [/^تعديل الحساب: /g, 'Edit account: '], [/^عقد إيجار شقة (\d+)$/g, 'Lease contract — unit $1'], [/^إيصال سداد /g, 'Payment receipt '],
    [/^(\d+) دفعات$/g, '$1 payments'], [/(^|[\s·—(])شقة (\d+)/g, '$1Unit $2'], [/^درهم · /g, 'AED · '], [/ درهم ما انحصّلت$/g, ' AED not collected yet'],
    [/(\d[\d.,]*) ألف درهم/g, '$1K AED'],
  );
  const PH = {
    'ابحث بالاسم أو الجوال أو الهوية…': 'Search by name, mobile or ID…', 'ابحث باسم المالك أو اسم المستخدم…': 'Search owner or username…',
    'ابحث بالنوع أو الشقة أو العقار أو الفني…': 'Search type, unit, property or technician…', 'الرمز من تطبيق المصادقة': 'Code from authenticator app',
    'تكييف، سباكة، كهرباء…': 'A/C, plumbing, electrical…', 'رقم الشيك أو الحوالة…': 'Cheque or transfer no.…', 'مثال: بناية الواحة': 'e.g. Al Waha Building',
  };

  // ---------- كل شي ثاني (أسماء، أماكن، ملاحظات) ----------
  // أسماء وأماكن معروفة
  const NAMES = {
    'محمد': 'Mohammed', 'أحمد': 'Ahmed', 'احمد': 'Ahmed', 'خالد': 'Khalid', 'سيف': 'Saif', 'مريم': 'Maryam', 'يوسف': 'Yousef', 'سعيد': 'Saeed', 'عائشة': 'Aisha', 'سلطان': 'Sultan',
    'فاطمة': 'Fatima', 'هند': 'Hind', 'عبدالله': 'Abdullah', 'عبد الله': 'Abdullah', 'نورة': 'Noura', 'حمد': 'Hamad', 'راشد': 'Rashid', 'سالم': 'Salem', 'علي': 'Ali', 'عمر': 'Omar',
    'حمدان': 'Hamdan', 'منصور': 'Mansour', 'شيخة': 'Shaikha', 'موزة': 'Moza', 'ميثاء': 'Maitha', 'ماجد': 'Majid', 'ناصر': 'Nasser', 'إبراهيم': 'Ibrahim', 'ابراهيم': 'Ibrahim', 'حسن': 'Hassan',
    'السويدي': 'Al Suwaidi', 'البلوشي': 'Al Balushi', 'الهاملي': 'Al Hameli', 'الظاهري': 'Al Dhaheri', 'الكتبي': 'Al Ketbi', 'المهيري': 'Al Mheiri', 'الزعابي': 'Al Zaabi', 'القبيسي': 'Al Qubaisi',
    'الرميثي': 'Al Romaithi', 'الشامسي': 'Al Shamsi', 'المزروعي': 'Al Mazrouei', 'النعيمي': 'Al Nuaimi', 'الحمادي': 'Al Hammadi', 'الكعبي': 'Al Kaabi', 'العامري': 'Al Ameri', 'المنصوري': 'Al Mansouri',
    'الشحي': 'Al Shehhi', 'الفلاسي': 'Al Falasi', 'النقبي': 'Al Naqbi', 'المري': 'Al Marri', 'الدرمكي': 'Al Darmaki', 'الكندي': 'Al Kindi',
    'الواحة': 'Al Waha', 'النخيل': 'Al Nakheel', 'المروج': 'Al Murooj', 'العين': 'Al Ain', 'أبوظبي': 'Abu Dhabi', 'ابوظبي': 'Abu Dhabi', 'دبي': 'Dubai', 'الشارقة': 'Sharjah', 'الخالدية': 'Al Khalidiya',
    'الجيمي': 'Al Jimi', 'فلج': 'Falaj', 'هزاع': 'Hazza', 'سما': 'Sama', 'صاع': 'Saa', 'أبو': 'Abu', 'ابو': 'Abu', 'بن': 'bin', 'بنت': 'bint',
  };
  // كلمات شائعة في الملاحظات والأوصاف (للاحتياط إذا المترجم مو جاهز)
  const WORDS = {
    'مستأجر': 'tenant', 'سابق': 'former', 'يطلب': 'requests', 'تمديد': 'extension', 'العقد': 'contract', 'عقد': 'contract', 'سنة': 'year', 'إضافية': 'extra', 'يفضّل': 'prefers', 'يفضل': 'prefers',
    'التواصل': 'contact', 'مساءً': 'in the evening', 'صباحاً': 'in the morning', 'وعد': 'promised', 'بسداد': 'to pay', 'المتأخر': 'the overdue', 'نهاية': 'end of', 'الشهر': 'the month', 'تم': 'done:',
    'تغيير': 'changing', 'أقفال': 'locks', 'الباب': 'the door', 'عند': 'at', 'الاستلام': 'handover', 'تبديل': 'replace', 'مفتاح': 'switch', 'إنارة': 'lighting', 'الصالة': 'living room',
    'تسريب': 'leak', 'ماء': 'water', 'تحت': 'under', 'مغسلة': 'sink', 'المطبخ': 'kitchen', 'باب': 'door', 'غرفة': 'room', 'النوم': 'bedroom', 'تنظيف': 'cleaning', 'وتعبئة': 'and refilling',
    'غاز': 'gas', 'المكيف': 'A/C', 'مكيف': 'A/C', 'إعادة': 're-', 'دهان': 'painting', 'الشقة': 'the unit', 'كاملة': 'fully', 'إصلاح': 'repair', 'كهرباء': 'electricity', 'ومياه': 'and water',
    'المناطق': 'areas', 'المشتركة': 'common', 'فاتورة': 'bill', 'هيئة': 'authority', 'الكهرباء': 'electricity', 'والمياه': 'and water', 'الممرات': 'corridors', 'والدرج': 'and stairs', 'راتب': 'salary',
    'حارس': 'guard', 'البناية': 'the building', 'شركة': 'company', 'مؤسسة': 'establishment', 'النظافة': 'cleaning', 'الذهبية': 'golden', 'الأمان': 'Al Aman', 'للحراسة': 'security', 'البرودة': 'Al Buroda',
    'للتكييف': 'A/C services', 'فني': 'technician', 'السباكة': 'plumbing', 'الألوان': 'Al Alwan', 'منجرة': 'carpentry shop', 'الفجر': 'Al Fajr', 'غرفة': 'room', 'وصالة': 'and hall', 'غرفتان': '2 rooms',
    'الطابق': 'floor', 'وثيقة': 'document', 'تأمين': 'insurance', 'المبنى': 'building', 'بنك': 'bank', 'مصرف': 'bank', 'الأول': 'first', 'التجاري': 'commercial', 'الإسلامي': 'Islamic', 'حوالة': 'transfer',
    'في': 'in', 'من': 'from', 'إلى': 'to', 'على': 'on', 'مع': 'with', 'و': 'and', 'أو': 'or', 'بعد': 'after', 'قبل': 'before', 'كل': 'all', 'لا': 'no', 'ما': 'not', 'هذا': 'this', 'هذه': 'this',
    'جديد': 'new', 'قديم': 'old', 'كبير': 'big', 'صغير': 'small', 'شهر': 'month', 'يوم': 'day', 'أسبوع': 'week', 'سيارة': 'car', 'موقف': 'parking', 'مفاتيح': 'keys', 'عداد': 'meter',
  };
  Object.assign(WORDS, { 'شيك': 'cheque', 'درهم': 'AED', 'شقة': 'unit', 'شقق': 'units', 'الإدارة': 'Management', 'نقدي': 'cash', 'نقداً': 'cash', 'متأخرة': 'late', 'سداد': 'payment',
    'الدفعة': 'payment', 'الثالثة': 'third', 'الثانية': 'second', 'الأولى': 'first', 'الرابعة': 'fourth', 'غرف': 'rooms', 'ثلاث': 'three', 'وصالة': 'and hall' });
  // نفس الكلمات بدون تشكيل (مساءً = مساء)
  Object.keys(WORDS).forEach(k => { const b = k.replace(/[ً-ٰٟـ]/g, ''); if (!WORDS[b]) WORDS[b] = WORDS[k]; });
  const AR_DIGITS = /[٠-٩]/g;
  const TL = { 'ا': 'a', 'أ': 'a', 'إ': 'i', 'آ': 'aa', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd',
    'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'ة': 'a', 'و': 'o', 'ي': 'i', 'ى': 'a', 'ء': '', 'ئ': 'e', 'ؤ': 'o' };
  const cap = w => w ? w[0].toUpperCase() + w.slice(1) : w;
  function translit(word) {
    const w = word.replace(/[ً-ٰٟـ]/g, '');
    if (NAMES[w]) return NAMES[w];
    if (w.startsWith('ال') && w.length > 3) { const rest = w.slice(2); return 'Al ' + (NAMES[rest] || cap(translit(rest).toLowerCase())); }
    let out = '';
    [...w].forEach((ch, i) => {
      let t = TL[ch]; if (t == null) { out += ch; return; }
      if (ch === 'و' && i === 0) t = 'w';
      if (ch === 'ي' && (i === 0 || i === w.length - 1 && w.length > 2)) t = i === 0 ? 'y' : 'i';
      out += t;
    });
    out = out.replace(/([bdfghjklmnqrstvwxyz])([bdfghjklmnqrstvwxyz])([bdfghjklmnqrstvwxyz])/g, '$1$2a$3');
    return cap(out);
  }
  function wordFallback(seg) {
    return seg.split(/(\s+)/).map(p => {
      if (!/[؀-ۿ]/.test(p)) return p;
      const bare = p.replace(/[ً-ٰٟـ]/g, '');
      if (WORDS[bare]) return WORDS[bare];
      if (NAMES[bare]) return NAMES[bare];
      if (bare.startsWith('و') && bare.length > 2 && (WORDS[bare.slice(1)] || NAMES[bare.slice(1)])) return 'and ' + (WORDS[bare.slice(1)] || NAMES[bare.slice(1)]);
      if (bare.startsWith('ب') && bare.length > 3 && WORDS[bare.slice(1)]) return 'with ' + WORDS[bare.slice(1)];
      return translit(bare);
    }).join('');
  }

  // مترجم Chrome المدمج (على الجهاز، مجاني) — نستخدمه إذا كان جاهز، والنتائج تنحفظ
  const MT_KEY = 'saa_mt_cache';
  let MT = {}; try { MT = JSON.parse(localStorage.getItem(MT_KEY) || '{}'); } catch { }
  let translator = null, mtState = 'off';
  const mtQueue = new Set();
  async function initMT() {
    if (!('Translator' in self)) return;
    try {
      const av = await Promise.race([Translator.availability({ sourceLanguage: 'ar', targetLanguage: 'en' }), new Promise(r => setTimeout(() => r('timeout'), 2500))]);
      if (av !== 'available') { mtState = av; return; }
      translator = await Translator.create({ sourceLanguage: 'ar', targetLanguage: 'en' });
      mtState = 'ready'; flushMT();
    } catch (e) { mtState = 'error'; }
  }
  let flushing = false;
  async function flushMT() {
    if (!translator || flushing || !mtQueue.size) return;
    flushing = true;
    try {
      for (const seg of [...mtQueue]) {
        mtQueue.delete(seg);
        try { MT[seg] = (await translator.translate(seg)).trim(); } catch { }
      }
      try { localStorage.setItem(MT_KEY, JSON.stringify(MT)); } catch { }
      retranslateAll();
    } finally { flushing = false; }
  }
  // كل نص عربي باقي: من الذاكرة، أو المترجم، أو الاحتياط
  const anyAr = /[؀-ۿ][؀-ۿً-ٰٟ\s،؛]*[؀-ۿ]|[؀-ۿ]/g;
  function finish(s) {
    if (!/[؀-ۿ٠-٩]/.test(s)) return s;
    s = s.replace(AR_DIGITS, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/،/g, ',').replace(/؛/g, ';').replace(/؟/g, '?').replace(/«|»/g, '"');
    return s.replace(anyAr, seg => {
      const k = seg.trim();
      if (MT[k]) return seg.replace(k, MT[k]);
      if (D[k]) return seg.replace(k, D[k]);
      if (k.split(/\s+/).length >= 3 && 'Translator' in self) { mtQueue.add(k); }
      return seg.replace(k, wordFallback(k));
    });
  }

  const tr0 = s => {
    const t = s.replace(/\s+/g, ' ').trim();
    if (!t || !/[؀-ۿ]/.test(t)) return null;
    if (D[t]) return s.replace(t, D[t]);
    // نفس النص مع علامات حوله: «· الشقق:» أو «(…)»
    const m = t.match(/^([·—\-(\s]*)(.+?)([:：)\s·]*)$/);
    if (m && D[m[2]]) return s.replace(t, m[1] + D[m[2]] + m[3]);
    // القواعد مثبّتة على أول وآخر النص (^…$)، فنطبّقها على النص بدون المسافات اللي حوله
    let out = t;
    for (const [re, to] of PARTS) out = out.replace(re, to);
    if (out === t) return null;
    // نرجّع المسافات اللي كانت قبل وبعد النص
    return s.slice(0, s.length - s.trimStart().length) + out + s.slice(s.trimEnd().length);
  };
  const tr = s => { const a = tr0(s); const b = finish(a == null ? s : a); return b === s ? null : b; };

  // نحفظ النص الأصلي لكل عقدة عشان لو وصلت ترجمة أدق نعيد عليه
  const ORIG = new WeakMap(), TOUCHED = new Set();
  function retranslateAll() {
    TOUCHED.forEach(ref => { const n = ref.deref && ref.deref(); if (!n || !n.isConnected) { TOUCHED.delete(ref); return; } const o = ORIG.get(n); if (o == null) return; const v = tr(o); if (v != null) n.nodeValue = v; });
  }

  function translate(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && !n.parentElement.closest('script,style,textarea,.sx-no-tr') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT });
    const list = []; let n; while ((n = w.nextNode())) list.push(n);
    list.forEach(node => {
      const v = tr(node.nodeValue);
      if (v != null && v !== node.nodeValue) { ORIG.set(node, node.nodeValue); TOUCHED.add(new WeakRef(node)); node.nodeValue = v; }
    });
    root.querySelectorAll('[placeholder],[title],[aria-label],[value]').forEach(el => {
      ['placeholder', 'title', 'aria-label'].forEach(a => {
        const v = el.getAttribute(a); if (!v || !/[؀-ۿ]/.test(v)) return;
        const t = PH[v.trim()] || D[v.trim()] || tr(v); if (t) el.setAttribute(a, t);
      });
    });
    if (mtQueue.size) flushMT();
    root.querySelectorAll('option').forEach(o => { const v = tr(o.textContent); if (v) o.textContent = v; });
  }

  function apply() {
    const app = document.getElementById('app');
    if (app) { app.dir = 'ltr'; app.lang = 'en'; translate(app); }
    document.querySelectorAll('.ov').forEach(ov => { ov.dir = 'ltr'; ov.lang = 'en'; translate(ov); });
    const toasts = document.getElementById('toasts'); if (toasts) { toasts.dir = 'ltr'; translate(toasts); }
    if (document.title.includes('إدارة العقارات')) document.title = 'Sama Saa v3 | Property management';
  }

  // زر اللغة في القائمة (جنب دوائر التصميم)
  function addToggle() {
    const nav = document.querySelector('.top .nav');
    if (!nav || nav.querySelector('.sx-lang')) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sx-lang sx-no-tr';
    b.innerHTML = lang === 'en' ? '<b>EN</b> · <span>ع</span>' : '<span>EN</span> · <b>ع</b>';
    b.title = lang === 'en' ? 'التبديل للعربي' : 'Switch to English';
    b.setAttribute('aria-label', b.title);
    b.onclick = () => {
      try { localStorage.setItem(KEY, lang === 'en' ? 'ar' : 'en'); } catch { }
      // ضغطة المستخدم تسمح لـ Chrome يبدأ تنزيل نموذج الترجمة (مرة وحدة)
      if (lang !== 'en' && 'Translator' in self) { try { Translator.create({ sourceLanguage: 'ar', targetLanguage: 'en' }).catch(() => {}); } catch { } }
      setTimeout(() => location.reload(), 150);
    };
    nav.appendChild(b);
  }

  if (lang === 'en') { document.documentElement.classList.add('sx-en'); initMT(); }
  window.saaI18n = {
    state: () => ({ mt: mtState, cached: Object.keys(MT).length, queued: mtQueue.size }),
    // ملف الـ PDF يترسم برا #app، فنترجمه هو بعد إذا اللغة إنجليزي
    isEn: () => lang === 'en',
    text: s => (lang === 'en' ? tr(s) : null) ?? s,
    translate: root => { if (lang !== 'en' || !root) return; root.querySelectorAll('[dir="rtl"]').forEach(e => { e.dir = 'ltr'; }); translate(root); },
  };
  let pending = false;
  const run = () => { pending = false; addToggle(); if (lang === 'en') apply(); };
  const obs = new MutationObserver(() => { if (pending) return; pending = true; setTimeout(run, 20); });
  const start = () => {
    obs.observe(document.body, { childList: true, subtree: true });
    run();
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
