// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'fr';
        this.translations = {
            fr: {
                // Header
                dashboard: 'Tableau de bord',
                settings: 'Paramètres',
                logout: 'Déconnexion',
                
                // Page Title
                pageTitle: 'Gestion des Commandes',
                
                // Stats
                newOrders: 'Nouvelles',
                processing: 'En cours',
                shipped: 'Expédiées',
                completed: 'Terminées',
                
                // Toolbar
                searchPlaceholder: 'Rechercher par nom, téléphone ou numéro de commande...',
                allStatuses: 'Tous les statuts',
                new: 'Nouveau',
                cancelled: 'Annulé',
                to: 'à',
                export: 'Exporter',
                addTestOrder: 'Commande test',
                
                // Table Headers
                orderNumber: 'N°',
                customerName: 'Nom',
                phone: 'Téléphone',
                wilaya: 'Wilaya',
                product: 'Produit',
                variants: 'Variantes',
                quantity: 'Quantité',
                total: 'Total',
                date: 'Date',
                status: 'Statut',
                actions: 'Actions',
                
                // Modal
                orderDetails: 'Détails de la commande',
                invoice: 'Facture',
                customerInfo: 'Informations client',
                callNow: 'Appeler',
                orderItems: 'Articles commandés',
                price: 'Prix',
                customerNotes: 'Notes du client',
                sellerNotes: 'Notes internes',
                sellerNotesPlaceholder: 'Ajouter des notes internes...',
                noAnswer: '❌ N\'a pas répondu',
                called: '☎ Appelé avec succès',
                callLater: '⏳ Rappeler plus tard',
                copyInfo: 'Copier infos',
                printInvoice: 'Imprimer',
                updateStatus: 'Mettre à jour',
                
                // Actions
                details: 'Détails',
                
                // Messages
                orderCopied: 'Informations de la commande copiées !',
                noteAdded: 'Note ajoutée avec succès !',
                statusUpdated: 'Statut mis à jour !',
                testOrderAdded: 'Commande test ajoutée !',
                
                // Status
                statusNew: 'Nouveau',
                statusProcessing: 'En cours',
                statusShipped: 'Expédié',
                statusCompleted: 'Terminé',
                statusCancelled: 'Annulé'
            },
            en: {
                // Header
                dashboard: 'Dashboard',
                settings: 'Settings',
                logout: 'Logout',
                
                // Page Title
                pageTitle: 'Orders Management',
                
                // Stats
                newOrders: 'New',
                processing: 'Processing',
                shipped: 'Shipped',
                completed: 'Completed',
                
                // Toolbar
                searchPlaceholder: 'Search by name, phone or order number...',
                allStatuses: 'All statuses',
                new: 'New',
                cancelled: 'Cancelled',
                to: 'to',
                export: 'Export',
                addTestOrder: 'Test order',
                
                // Table Headers
                orderNumber: 'N°',
                customerName: 'Name',
                phone: 'Phone',
                wilaya: 'Wilaya',
                product: 'Product',
                variants: 'Variants',
                quantity: 'Quantity',
                total: 'Total',
                date: 'Date',
                status: 'Status',
                actions: 'Actions',
                
                // Modal
                orderDetails: 'Order Details',
                invoice: 'Invoice',
                customerInfo: 'Customer Information',
                callNow: 'Call',
                orderItems: 'Order Items',
                price: 'Price',
                customerNotes: 'Customer Notes',
                sellerNotes: 'Internal Notes',
                sellerNotesPlaceholder: 'Add internal notes...',
                noAnswer: '❌ No answer',
                called: '☎ Called successfully',
                callLater: '⏳ Call back later',
                copyInfo: 'Copy info',
                printInvoice: 'Print',
                updateStatus: 'Update',
                
                // Actions
                details: 'Details',
                
                // Messages
                orderCopied: 'Order information copied!',
                noteAdded: 'Note added successfully!',
                statusUpdated: 'Status updated!',
                testOrderAdded: 'Test order added!',
                
                // Status
                statusNew: 'New',
                statusProcessing: 'Processing',
                statusShipped: 'Shipped',
                statusCompleted: 'Completed',
                statusCancelled: 'Cancelled'
            }
        };
        
        this.init();
    }
    
    init() {
        this.updateLanguageDisplay();
        this.translatePage();
        
        // Language toggle event
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
    
    toggleLanguage() {
        this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('language', this.currentLang);
        this.updateLanguageDisplay();
        this.translatePage();
    }
    
    updateLanguageDisplay() {
        const langText = document.getElementById('langText');
        langText.textContent = this.currentLang === 'fr' ? 'Français' : 'English';
    }
    
    translatePage() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (this.translations[this.currentLang][key]) {
                element.textContent = this.translations[this.currentLang][key];
            }
        });
        
        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-key-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-key-placeholder');
            if (this.translations[this.currentLang][key]) {
                element.placeholder = this.translations[this.currentLang][key];
            }
        });
    }
    
    t(key) {
        return this.translations[this.currentLang][key] || key;
    }
}

// Orders Management System
class OrdersManager {
    constructor() {
        this.orders = this.loadOrders();
        this.filteredOrders = [...this.orders];
        this.currentOrder = null;
        
        this.init();
    }
    
    init() {
        this.renderOrders();
        this.updateStats();
        this.bindEvents();
        this.initModal();
    }
    
    loadOrders() {
        // Load from localStorage or return sample data
        const saved = localStorage.getItem('orders');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return this.generateSampleOrders();
    }
    
    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }
    
    generateSampleOrders() {
        const sampleOrders = [
            {
                id: 'ORD-001',
                customerName: 'Marie Dubois',
                phone: '+33 6 12 34 56 78',
                wilaya: 'Alger',
                address: '123 Rue de la Paix, Alger',
                product: 'Collier Élégance',
                variants: 'Or rose, 45cm',
                quantity: 1,
                total: 89.99,
                customerNotes: 'Livraison rapide s\'il vous plaît',
                sellerNotes: '',
                date: new Date(Date.now() - 86400000).toISOString(),
                status: 'new',
                isRead: false
            },
            {
                id: 'ORD-002',
                customerName: 'Jean Martin',
                phone: '+33 6 98 76 54 32',
                wilaya: 'Oran',
                address: '456 Avenue des Champs, Oran',
                product: 'Bague Diamant',
                variants: 'Argent, Taille 56',
                quantity: 1,
                total: 159.99,
                customerNotes: '',
                sellerNotes: '☎ Appelé avec succès',
                date: new Date(Date.now() - 172800000).toISOString(),
                status: 'processing',
                isRead: true
            },
            {
                id: 'ORD-003',
                customerName: 'Sophie Laurent',
                phone: '+33 6 11 22 33 44',
                wilaya: 'Constantine',
                address: '789 Boulevard Saint-Michel, Constantine',
                product: 'Bracelet Charme',
                variants: 'Or blanc, 18cm',
                quantity: 2,
                total: 199.98,
                customerNotes: 'Cadeau d\'anniversaire',
                sellerNotes: '',
                date: new Date(Date.now() - 259200000).toISOString(),
                status: 'shipped',
                isRead: true
            }
        ];
        
        return sampleOrders;
    }
    
    bindEvents() {
        // Search functionality with clear button
        const searchInput = document.getElementById('searchInput');
        const searchClear = document.getElementById('searchClear');
        
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value.length > 0) {
                searchClear.style.display = 'block';
            } else {
                searchClear.style.display = 'none';
            }
            this.filterOrders();
        });
        
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchClear.style.display = 'none';
            this.filterOrders();
        });
        
        // Status filter
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterOrders();
        });
        
        // Date filters
        document.getElementById('dateFrom').addEventListener('change', () => {
            this.filterOrders();
        });
        
        document.getElementById('dateTo').addEventListener('change', () => {
            this.filterOrders();
        });
        
        // Add test order
        document.getElementById('addTestOrderBtn').addEventListener('click', () => {
            this.addTestOrder();
        });
        
        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportOrders();
        });
        
        // User menu toggle
        document.getElementById('menuToggle').addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.classList.remove('show');
        });
    }
    
    filterOrders() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;
        
        this.filteredOrders = this.orders.filter(order => {
            // Search filter
            const matchesSearch = !searchTerm || 
                order.customerName.toLowerCase().includes(searchTerm) ||
                order.phone.includes(searchTerm) ||
                order.id.toLowerCase().includes(searchTerm) ||
                order.product.toLowerCase().includes(searchTerm);
            
            // Status filter
            const matchesStatus = !statusFilter || order.status === statusFilter;
            
            // Date filter
            const orderDate = new Date(order.date).toISOString().split('T')[0];
            const matchesDateFrom = !dateFrom || orderDate >= dateFrom;
            const matchesDateTo = !dateTo || orderDate <= dateTo;
            
            return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
        });
        
        this.renderOrders();
    }
    
    renderOrders() {
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = '';
        
        if (this.filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10" style="text-align: center; padding: 2rem; color: var(--text-gray);">
                        ${window.langManager.t('noOrdersFound') || 'Aucune commande trouvée'}
                    </td>
                </tr>
            `;
            return;
        }
        
        this.filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            if (!order.isRead) {
                row.classList.add('unread');
            }
            
            row.innerHTML = `
                <td><strong>${order.id}</strong></td>
                <td>${order.customerName}</td>
                <td class="desktop-only">${order.phone}</td>
                <td class="desktop-only">${order.wilaya}</td>
                <td>${order.product}</td>
                <td class="desktop-only">${order.quantity}</td>
                <td class="desktop-only">€${order.total.toFixed(2)}</td>
                <td class="desktop-only">${this.formatDate(order.date)}</td>
                <td>${this.renderStatusBadge(order.status)}</td>
                <td>
                    <button class="action-btn" onclick="ordersManager.openOrderModal('${order.id}')">
                        ${window.langManager.t('details')}
                    </button>
                </td>
            `;
            
            // Add click event to row
            row.addEventListener('click', (e) => {
                if (!e.target.classList.contains('action-btn')) {
                    this.openOrderModal(order.id);
                }
            });
            
            tbody.appendChild(row);
        });
    }
    
    renderStatusBadge(status) {
        const statusMap = {
            new: { icon: 'fas fa-plus-circle', text: window.langManager.t('statusNew') },
            processing: { icon: 'fas fa-clock', text: window.langManager.t('statusProcessing') },
            shipped: { icon: 'fas fa-truck', text: window.langManager.t('statusShipped') },
            completed: { icon: 'fas fa-check-circle', text: window.langManager.t('statusCompleted') },
            cancelled: { icon: 'fas fa-times-circle', text: window.langManager.t('statusCancelled') }
        };
        
        const statusInfo = statusMap[status] || statusMap.new;
        
        return `
            <span class="status-badge ${status}">
                <i class="${statusInfo.icon}"></i>
                ${statusInfo.text}
            </span>
        `;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(window.langManager.currentLang === 'fr' ? 'fr-FR' : 'en-US');
    }
    
    updateStats() {
        const stats = {
            new: this.orders.filter(o => o.status === 'new').length,
            processing: this.orders.filter(o => o.status === 'processing').length,
            shipped: this.orders.filter(o => o.status === 'shipped').length,
            completed: this.orders.filter(o => o.status === 'completed').length
        };
        
        document.getElementById('newOrdersCount').textContent = stats.new;
        document.getElementById('processingOrdersCount').textContent = stats.processing;
        document.getElementById('shippedOrdersCount').textContent = stats.shipped;
        document.getElementById('completedOrdersCount').textContent = stats.completed;
    }
    
    addTestOrder() {
        const testOrder = {
            id: `ORD-${String(this.orders.length + 1).padStart(3, '0')}`,
            customerName: 'Client Test',
            phone: '+213 555 123 456',
            wilaya: 'Alger',
            address: '123 Rue Test, Alger',
            product: 'Produit Test',
            variants: 'Variante Test',
            quantity: 1,
            total: 99.99,
            customerNotes: 'Commande de test',
            sellerNotes: '',
            date: new Date().toISOString(),
            status: 'new',
            isRead: false
        };
        
        this.orders.unshift(testOrder);
        this.filteredOrders = [...this.orders];
        this.saveOrders();
        this.renderOrders();
        this.updateStats();
        
        this.showNotification(window.langManager.t('testOrderAdded'));
    }
    
    exportOrders() {
        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    
    generateCSV() {
        const headers = [
            'Order ID', 'Customer Name', 'Phone', 'Wilaya', 'Product', 
            'Variants', 'Quantity', 'Total', 'Date', 'Status', 'Customer Notes', 'Seller Notes'
        ];
        
        const rows = this.filteredOrders.map(order => [
            order.id,
            order.customerName,
            order.phone,
            order.wilaya,
            order.product,
            order.variants,
            order.quantity,
            order.total,
            this.formatDate(order.date),
            order.status,
            order.customerNotes,
            order.sellerNotes
        ]);
        
        return [headers, ...rows].map(row => 
            row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        ).join('\n');
    }
    
    initModal() {
        const modal = document.getElementById('modalOverlay');
        const closeBtn = document.getElementById('modalClose');
        
        // Close modal events
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
        
        // Modal action buttons
        document.getElementById('copyInfoBtn').addEventListener('click', () => {
            this.copyOrderInfo();
        });
        
        document.getElementById('printInvoiceBtn').addEventListener('click', () => {
            this.printInvoice();
        });
        
        document.getElementById('callBtn').addEventListener('click', () => {
            this.callCustomer();
        });
        
        // Status change buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('status-btn') || e.target.closest('.status-btn')) {
                const btn = e.target.classList.contains('status-btn') ? e.target : e.target.closest('.status-btn');
                const newStatus = btn.getAttribute('data-status');
                this.updateOrderStatusTo(newStatus);
            }
        });
        
        // Quick notes buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-note-btn') || e.target.closest('.quick-note-btn')) {
                const btn = e.target.classList.contains('quick-note-btn') ? e.target : e.target.closest('.quick-note-btn');
                const note = btn.getAttribute('data-note');
                this.addQuickNote(note);
            }
        });
        
        // Auto-save seller notes
        document.getElementById('sellerNotesInput').addEventListener('input', 
            this.debounce(() => this.saveSellerNotes(), 1000)
        );
    }
    
    openOrderModal(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;
        
        this.currentOrder = order;
        
        // Mark as read
        if (!order.isRead) {
            order.isRead = true;
            this.saveOrders();
            this.renderOrders();
        }
        
        this.populateModal(order);
        
        const modal = document.getElementById('modalOverlay');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('modalOverlay');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        this.currentOrder = null;
    }
    
    populateModal(order) {
        // Basic info
        document.getElementById('modalOrderId').textContent = order.id;
        document.getElementById('modalOrderDate').textContent = this.formatDate(order.date);
        document.getElementById('modalCustomerName').textContent = order.customerName;
        document.getElementById('modalCustomerPhone').textContent = order.phone;
        document.getElementById('modalCustomerWilaya').textContent = order.wilaya;
        document.getElementById('modalCustomerAddress').textContent = order.address;
        document.getElementById('modalOrderTotal').textContent = `€${order.total.toFixed(2)}`;
        
        // Order items
        const itemsContainer = document.getElementById('modalOrderItems');
        itemsContainer.innerHTML = `
            <div class="item-details">
                <div class="item-name">${order.product}</div>
                <div class="item-variants">${order.variants}</div>
            </div>
            <div class="item-quantity">${order.quantity}</div>
            <div class="item-price">€${order.total.toFixed(2)}</div>
        `;
        
        // Customer notes
        const notesSection = document.getElementById('customerNotesSection');
        const notesElement = document.getElementById('modalCustomerNotes');
        if (order.customerNotes) {
            notesElement.textContent = order.customerNotes;
            notesSection.style.display = 'block';
        } else {
            notesSection.style.display = 'none';
        }
        
        // Seller notes
        document.getElementById('sellerNotesInput').value = order.sellerNotes || '';
        
        // Update progress and status buttons
        this.updateOrderProgress(order.status);
        this.updateStatusButtons(order.status);
    }
    
    updateOrderProgress(status) {
        const steps = document.querySelectorAll('.progress-step');
        const statusOrder = ['new', 'processing', 'shipped', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index < currentIndex) {
                step.classList.add('completed');
            } else if (index === currentIndex) {
                step.classList.add('active');
            }
        });
    }
    
    updateStatusButtons(currentStatus) {
        const buttons = document.querySelectorAll('.status-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-status') === currentStatus) {
                btn.classList.add('active');
            }
        });
    }
    
    copyOrderInfo() {
        if (!this.currentOrder) return;
        
        const order = this.currentOrder;
        const info = `
Commande: ${order.id}
Client: ${order.customerName}
Téléphone: ${order.phone}
Wilaya: ${order.wilaya}
Adresse: ${order.address}
Produit: ${order.product}
Variantes: ${order.variants}
Quantité: ${order.quantity}
Total: €${order.total.toFixed(2)}
Date: ${this.formatDate(order.date)}
Statut: ${order.status}
${order.customerNotes ? `Notes client: ${order.customerNotes}` : ''}
        `.trim();
        
        navigator.clipboard.writeText(info).then(() => {
            this.showNotification(window.langManager.t('orderCopied'));
        });
    }
    
    printInvoice() {
        window.print();
    }
    
    updateOrderStatusTo(newStatus) {
        if (!this.currentOrder || this.currentOrder.status === newStatus) return;
        
        this.currentOrder.status = newStatus;
        this.saveOrders();
        this.renderOrders();
        this.updateStats();
        this.updateOrderProgress(newStatus);
        this.updateStatusButtons(newStatus);
        this.showNotification(window.langManager.t('statusUpdated'));
    }
    
    callCustomer() {
        if (!this.currentOrder) return;
        
        const phoneNumber = this.currentOrder.phone.replace(/\s/g, '');
        window.open(`tel:${phoneNumber}`, '_self');
    }
    
    addQuickNote(note) {
        const textarea = document.getElementById('sellerNotesInput');
        const currentNotes = textarea.value;
        const newNotes = currentNotes ? `${currentNotes}\n${note}` : note;
        
        textarea.value = newNotes;
        this.saveSellerNotes();
        this.showNotification(window.langManager.t('noteAdded'));
    }
    
    saveSellerNotes() {
        if (!this.currentOrder) return;
        
        const notes = document.getElementById('sellerNotesInput').value;
        this.currentOrder.sellerNotes = notes;
        this.saveOrders();
    }
    
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--status-new);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.optimizeScrolling();
        this.preloadCriticalResources();
    }
    
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    optimizeScrolling() {
        let ticking = false;
        
        function updateScrollPosition() {
            // Add scroll-based optimizations here
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
    }
    
    setupKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                const modal = document.getElementById('modalOverlay');
                if (modal.classList.contains('show')) {
                    window.ordersManager.closeModal();
                }
            }
        });
    }
    
    setupScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('button, input, select').forEach(element => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const text = element.textContent || element.placeholder || element.value;
                if (text) {
                    element.setAttribute('aria-label', text);
                }
            }
        });
    }
    
    setupFocusManagement() {
        // Trap focus in modals
        const modal = document.getElementById('modalOverlay');
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    window.langManager = new LanguageManager();
    window.ordersManager = new OrdersManager();
    window.performanceOptimizer = new PerformanceOptimizer();
    window.accessibilityManager = new AccessibilityManager();
    
    // Add loading states
    document.body.classList.add('loaded');
    
    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    // You could send this to an error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error reporting service
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageManager,
        OrdersManager,
        PerformanceOptimizer,
        AccessibilityManager
    };
}
