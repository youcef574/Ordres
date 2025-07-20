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
                id: 'id',
                nom: 'Nom',
                phone: 'Téléphone',
                wilaya: 'Wilaya',
                produit: 'produit',
                variants: 'Variantes',
                quantity: 'Qté',
                total: 'Total',
                date: 'Date',
                statut: 'statut',
                action: 'action',
                
                // Modal
                invoiceTitle: 'Facture de clients',
                invoiceTitle: 'Facture',
                produit: 'Produit',
                variantes: 'Variantes',
                quantite: 'Quantité',
                nom: 'Nom',
                telephone: 'Téléphone',
                wilaya: 'Wilaya',
                commune: 'Commune',
                prixProduit: 'Prix produit',
                fraisLivraison: 'Frais de livraison',
                total: 'Total',
                callClient: '📞 Appeler le client',
                memos: '📝 Mémos / Notes',
                noAnswer: '❌ N\'a pas répondu',
                called: '☎ Appelé avec succès',
                callLater: '⏳ Rappeler plus tard',
                
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
                id: 'id',
                nom: 'Name',
                phone: 'Phone',
                wilaya: 'Wilaya',
                produit: 'product',
                variants: 'Variants',
                quantity: 'Qty',
                total: 'Total',
                date: 'Date',
                statut: 'status',
                action: 'action',
                
                // Modal
                invoiceTitle: 'Invoice',
                produit: 'Product',
              //  couleur: 'Color',
                Variantes: 'variable',   
                quantite: 'Quantity',
                nom: 'Name',
                telephone: 'Phone',
                wilaya: 'Wilaya',
                commune: 'City',
                prixProduit: 'Product price',
                fraisLivraison: 'Delivery fees',
                total: 'Total',
                callClient: '📞 Call client',
                memos: '📝 Memos / Notes',
                noAnswer: '❌ No answer',
                called: '☎ Called successfully',
                callLater: '⏳ Call back later',
                
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
        
        // Update table headers
        this.updateTableHeaders();
        
        // Update modal if open
        if (window.ordersManager && window.ordersManager.currentOrder) {
            window.ordersManager.populateModal(window.ordersManager.currentOrder);
        }
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
    
    updateTableHeaders() {
        const headers = document.querySelectorAll('.orders-table th');
        const headerKeys = ['id', 'nom', 'phone', 'wilaya', 'produit', 'variants', 'quantity', 'total', 'date', 'statut', 'action'];
        
        headers.forEach((header, index) => {
            if (headerKeys[index] && this.translations[this.currentLang][headerKeys[index]]) {
                header.textContent = this.translations[this.currentLang][headerKeys[index]];
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
                id: '1',
                customerName: 'Marie',
                phone: '+33 6 12 34 56 78',
                wilaya: 'Paris',
                city: 'Paris',
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
                id: '2',
                customerName: 'Jean',
                phone: '+33 6 98 76 54 32',
                wilaya: 'Rhône',
                city: 'Lyon',
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
                id: '3',
                customerName: 'Sophie',
                phone: '+33 6 11 22 33 44',
                wilaya: 'Bouches-du-Rhône',
                city: 'Marseille',
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
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
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
                order.product.toLowerCase().includes(searchTerm) ||
                order.wilaya.toLowerCase().includes(searchTerm) ||
                order.city.toLowerCase().includes(searchTerm);
            
            // Status filter
            const matchesStatus = !statusFilter || order.status === statusFilter;
            
            // Date filter
            const orderDate = new Date(order.date).toISOString().split('T')[0];
            const matchesDateFrom = !dateFrom || orderDate >= dateFrom;
            const matchesDateTo = !dateTo || orderDate <= dateTo;
            
            return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
        });
        
        this.renderOrders();
        
        // Add search result count
        this.updateSearchResults();
    }
    
    updateSearchResults() {
        const searchInput = document.getElementById('searchInput');
        const resultCount = this.filteredOrders.length;
        const totalCount = this.orders.length;
        
        // Update placeholder to show results
        if (searchInput.value.trim()) {
            searchInput.setAttribute('data-results', `${resultCount} résultat${resultCount > 1 ? 's' : ''}`);
        } else {
            searchInput.removeAttribute('data-results');
        }
    }
    
    renderOrders() {
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = '';
        
        if (this.filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-gray);">
                        ${window.langManager.t('noOrdersFound') || 'Aucune commande trouvée'}
                    </td>
                </tr>
            `;
            return;
        }
        
        this.filteredOrders.forEach((order, index) => {
            const row = document.createElement('tr');
            if (!order.isRead) {
                row.classList.add('unread');
            }
            
            // Extract first name only
            const firstName = order.customerName.split(' ')[0];
            
            row.innerHTML = `
                <td class="col-id"><strong>${index + 1}</strong></td>
                <td class="col-nom truncate" title="${order.customerName}">${firstName}</td>
                <td class="col-phone">${order.phone}</td>
                <td class="col-wilaya truncate" title="${order.wilaya}, ${order.city}">${order.wilaya}</td>
                <td class="col-produit truncate" title="${order.product}">${order.product}</td>
                <td class="col-variants truncate" title="${order.variants}">${order.variants}</td>
                <td class="col-quantity">${order.quantity}</td>
                <td class="col-total">€${order.total.toFixed(2)}</td>
                <td class="col-date">${this.formatDate(order.date)}</td>
                <td class="col-statut">${this.renderStatusDropdown(order.id, order.status)}</td>
                <td class="col-action">
                    <button class="action-btn" onclick="ordersManager.openOrderModal('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            
            // Add click event to row
            row.addEventListener('click', (e) => {
                if (!e.target.closest('.action-btn') && !e.target.closest('.status-dropdown')) {
                    this.openOrderModal(order.id);
                }
            });
            
            tbody.appendChild(row);
        });
        
        // Bind status dropdown events
        this.bindStatusDropdowns();
    }
    
    renderStatusDropdown(orderId, currentStatus) {
        const statusOptions = {
            new: { icon: 'fas fa-plus-circle', text: window.langManager.t('statusNew'), color: 'new' },
            processing: { icon: 'fas fa-clock', text: window.langManager.t('statusProcessing'), color: 'processing' },
            shipped: { icon: 'fas fa-truck', text: window.langManager.t('statusShipped'), color: 'shipped' },
            completed: { icon: 'fas fa-check-circle', text: window.langManager.t('statusCompleted'), color: 'completed' },
            cancelled: { icon: 'fas fa-times-circle', text: window.langManager.t('statusCancelled'), color: 'cancelled' }
        };
        
        const currentOption = statusOptions[currentStatus];
        
        return `
            <div class="status-dropdown" data-order-id="${orderId}">
                <select class="status-select ${currentStatus}" onchange="ordersManager.updateOrderStatusFromTable('${orderId}', this.value)">
                    ${Object.entries(statusOptions).map(([status, option]) => 
                        `<option value="${status}" ${status === currentStatus ? 'selected' : ''}>${option.text}</option>`
                    ).join('')}
                </select>
                <div class="status-display ${currentStatus}">
                    <i class="${currentOption.icon}"></i>
                    <span>${currentOption.text}</span>
                </div>
            </div>
        `;
    }
    
    bindStatusDropdowns() {
        // Add click handlers for status dropdowns
        document.querySelectorAll('.status-dropdown').forEach(dropdown => {
            const select = dropdown.querySelector('.status-select');
            const display = dropdown.querySelector('.status-display');
            
            display.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('open');
                
                // Close other dropdowns
                document.querySelectorAll('.status-dropdown').forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('open');
                    }
                });
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.status-dropdown')) {
                document.querySelectorAll('.status-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });
    }
    
    updateOrderStatusFromTable(orderId, newStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.status !== newStatus) {
            order.status = newStatus;
            this.saveOrders();
            this.renderOrders();
            this.updateStats();
            this.showNotification(window.langManager.t('statusUpdated'));
            
            // Send WhatsApp message
            this.sendWhatsAppStatusUpdate(order, newStatus);
        }
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
            id: String(this.orders.length + 1),
            customerName: 'Client Test Nom',
            phone: '+33 6 00 00 00 00',
            wilaya: 'Alger',
            city: 'Alger Centre',
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
    
    toggleManualOrderForm() {
        const form = document.getElementById('manualOrderForm');
        form.classList.toggle('show');
        
        if (!form.classList.contains('show')) {
            this.clearManualOrderForm();
        }
    }
    
    clearManualOrderForm() {
        document.getElementById('manualCustomerName').value = '';
        document.getElementById('manualPhone').value = '';
        document.getElementById('manualWilaya').value = '';
        document.getElementById('manualCity').value = '';
        document.getElementById('manualProduct').value = '';
        document.getElementById('manualVariants').value = '';
        document.getElementById('manualQuantity').value = '1';
        document.getElementById('manualTotal').value = '';
        document.getElementById('manualNotes').value = '';
    }
    
    saveManualOrder() {
        const customerName = document.getElementById('manualCustomerName').value.trim();
        const phone = document.getElementById('manualPhone').value.trim();
        const wilaya = document.getElementById('manualWilaya').value.trim();
        const city = document.getElementById('manualCity').value.trim();
        const product = document.getElementById('manualProduct').value.trim();
        const variants = document.getElementById('manualVariants').value.trim();
        const quantity = parseInt(document.getElementById('manualQuantity').value);
        const total = parseFloat(document.getElementById('manualTotal').value);
        const notes = document.getElementById('manualNotes').value.trim();
        
        // Validation
        if (!customerName || !phone || !wilaya || !city || !product || !quantity || !total) {
            this.showNotification('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        const newOrder = {
            id: String(this.orders.length + 1),
            customerName,
            phone,
            wilaya,
            city,
            product,
            variants: variants || 'Standard',
            quantity,
            total,
            customerNotes: notes,
            sellerNotes: '',
            date: new Date().toISOString(),
            status: 'new',
            isRead: false
        };
        
        this.orders.unshift(newOrder);
        this.filteredOrders = [...this.orders];
        this.saveOrders();
        this.renderOrders();
        this.updateStats();
        this.toggleManualOrderForm();
        
        this.showNotification('Commande ajoutée avec succès !');
    }
    
    toggleReturnExchangeSection() {
        const section = document.getElementById('returnExchangeSection');
        section.classList.toggle('show');
        
        if (!section.classList.contains('show')) {
            // Clear form
            document.querySelectorAll('.return-option').forEach(opt => opt.classList.remove('selected'));
            document.getElementById('returnReason').value = '';
        }
    }
    
    submitReturnExchange() {
        const selectedOption = document.querySelector('.return-option.selected');
        const reason = document.getElementById('returnReason').value.trim();
        
        if (!selectedOption) {
            this.showNotification('Veuillez sélectionner le type de demande');
            return;
        }
        
        if (!reason) {
            this.showNotification('Veuillez indiquer la raison');
            return;
        }
        
        const type = selectedOption.getAttribute('data-type');
        const typeText = type === 'return' ? 'Retour' : 'Échange';
        
        // Add to seller notes
        const currentNotes = document.getElementById('notesTextarea').value;
        const newNote = `🔄 ${typeText} demandé: ${reason}`;
        const updatedNotes = currentNotes ? `${currentNotes}\n${newNote}` : newNote;
        
        document.getElementById('notesTextarea').value = updatedNotes;
        this.saveSellerNotes();
        
        // Update order status if needed
        if (this.currentOrder) {
            this.currentOrder.status = 'processing';
            this.saveOrders();
            this.renderOrders();
            this.updateStats();
        }
        
        this.toggleReturnExchangeSection();
        this.showNotification(`Demande de ${typeText.toLowerCase()} enregistrée`);
    }
    
    showDeleteConfirmation() {
        const dialog = document.getElementById('confirmationDialog');
        dialog.classList.add('show');
    }
    
    hideDeleteConfirmation() {
        const dialog = document.getElementById('confirmationDialog');
        dialog.classList.remove('show');
    }
    
    deleteCurrentOrder() {
        if (!this.currentOrder) return;
        
        const orderIndex = this.orders.findIndex(o => o.id === this.currentOrder.id);
        if (orderIndex !== -1) {
            this.orders.splice(orderIndex, 1);
            this.filteredOrders = [...this.orders];
            this.saveOrders();
            this.renderOrders();
            this.updateStats();
            this.closeModal();
            this.hideDeleteConfirmation();
            this.showNotification('Commande supprimée avec succès');
        }
    }
    
    sendWhatsAppStatusUpdate(order, newStatus) {
        // Check if phone number is valid for WhatsApp
        const phoneNumber = this.formatPhoneForWhatsApp(order.phone);
        
        if (!phoneNumber) {
            this.showWhatsAppStatus('Numéro de téléphone invalide', true);
            return;
        }
        
        // Create status message
        const statusMessages = {
            new: 'Votre commande a été reçue et est en cours de traitement.',
            processing: 'Votre commande est en cours de préparation.',
            shipped: 'Votre commande a été expédiée et est en route.',
            completed: 'Votre commande a été livrée avec succès.',
            cancelled: 'Votre commande a été annulée.'
        };
        
        const message = `Bonjour ${order.customerName},\n\n` +
                       `Mise à jour de votre commande #${order.id}:\n` +
                       `${statusMessages[newStatus]}\n\n` +
                       `Produit: ${order.product}\n` +
                       `Quantité: ${order.quantity}\n` +
                       `Total: €${order.total}\n\n` +
                       `Merci de votre confiance !\n` +
                       `YouzinElegancia`;
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message
        this.showWhatsAppStatus('Message préparé pour WhatsApp');
    }
    
    formatPhoneForWhatsApp(phone) {
        // Remove all non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Check if it's a valid phone number (at least 8 digits)
        if (cleaned.length < 8) {
            return null;
        }
        
        // Add country code if missing (assuming France +33)
        if (cleaned.startsWith('0')) {
            return '33' + cleaned.substring(1);
        } else if (cleaned.startsWith('33')) {
            return cleaned;
        } else if (cleaned.length >= 9) {
            return cleaned;
        }
        
        return null;
    }
    
    showWhatsAppStatus(message, isError = false) {
        const statusDiv = document.getElementById('whatsappStatus');
        const messageSpan = document.getElementById('whatsappMessage');
        
        messageSpan.textContent = message;
        statusDiv.classList.toggle('error', isError);
        statusDiv.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            statusDiv.classList.remove('show');
        }, 5000);
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
            'N°', 'Customer Name', 'Phone', 'Wilaya', 'City', 'Product', 
            'Variants', 'Quantity', 'Total', 'Date', 'Status', 'Customer Notes', 'Seller Notes'
        ];
        
        const rows = this.filteredOrders.map(order => [
            order.id,
            order.customerName,
            order.phone,
            order.wilaya,
            order.city,
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
        document.getElementById('callBtn').addEventListener('click', () => {
            this.callCustomer();
        });
        
        document.getElementById('addNotesBtn').addEventListener('click', () => {
            this.toggleNotesSection();
        });
        
        // Print and Save buttons
        document.getElementById('printBtn').addEventListener('click', () => {
            this.printModal();
        });
        
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveModalAsImage();
        });
        
        // Quick notes buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-note-btn')) {
                const note = e.target.getAttribute('data-note');
                this.addQuickNote(note);
            }
        });
        
        // Auto-save seller notes
        document.getElementById('notesTextarea').addEventListener('input', 
            this.debounce(() => this.saveSellerNotes(), 1000)
        );
        
        // Return/Exchange functionality
        document.getElementById('returnExchangeBtn').addEventListener('click', () => {
            this.toggleReturnExchangeSection();
        });
        
        document.getElementById('submitReturnExchange').addEventListener('click', () => {
            this.submitReturnExchange();
        });
        
        document.getElementById('cancelReturnExchange').addEventListener('click', () => {
            this.toggleReturnExchangeSection();
        });
        
        // Return option selection
        document.querySelectorAll('.return-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.return-option').forEach(opt => opt.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
        
        // Delete order functionality
        document.getElementById('deleteOrderBtn').addEventListener('click', () => {
            this.showDeleteConfirmation();
        });
        
        document.getElementById('confirmDelete').addEventListener('click', () => {
            this.deleteCurrentOrder();
        });
        
        document.getElementById('cancelDelete').addEventListener('click', () => {
            this.hideDeleteConfirmation();
        });
        
        // Manual order form
        document.getElementById('addManualOrderBtn').addEventListener('click', () => {
            this.toggleManualOrderForm();
        });
        
        document.getElementById('saveManualOrder').addEventListener('click', () => {
            this.saveManualOrder();
        });
        
        document.getElementById('cancelManualOrder').addEventListener('click', () => {
            this.toggleManualOrderForm();
        });
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
        // Update field values
        document.getElementById('produitValue').textContent = order.product;
        document.getElementById('couleurValue').textContent = order.variants;
        document.getElementById('quantiteValue').textContent = order.quantity;
        document.getElementById('nomValue').textContent = order.customerName;
        document.getElementById('telephoneValue').textContent = order.phone;
        document.getElementById('wilayaValue').textContent = order.wilaya;
        document.getElementById('communeValue').textContent = order.city;
        
        // Calculate delivery fee (10% of product price)
        const productPrice = order.total * 0.9; // Assuming 90% is product, 10% is delivery
        const deliveryFee = order.total * 0.1;
        
        document.getElementById('prixProduitValue').textContent = `€${productPrice.toFixed(2)}`;
        document.getElementById('fraisLivraisonValue').textContent = `€${deliveryFee.toFixed(2)}`;
        document.getElementById('totalValue').textContent = `€${order.total.toFixed(2)}`;
        
        // Update notes
        document.getElementById('notesTextarea').value = order.sellerNotes || '';
    }
    
    callCustomer() {
        if (!this.currentOrder) return;
        
        const phoneNumber = this.currentOrder.phone.replace(/\s/g, '');
        window.open(`tel:${phoneNumber}`, '_self');
    }
    
    toggleNotesSection() {
        const notesSection = document.getElementById('notesSection');
        notesSection.classList.toggle('show');
    }
    
    addQuickNote(note) {
        const textarea = document.getElementById('notesTextarea');
        const currentNotes = textarea.value;
        const newNotes = currentNotes ? `${currentNotes}\n${note}` : note;
        
        textarea.value = newNotes;
        this.saveSellerNotes();
        this.showNotification(window.langManager.t('noteAdded'));
    }
    
    saveSellerNotes() {
        if (!this.currentOrder) return;
        
        const notes = document.getElementById('notesTextarea').value;
        this.currentOrder.sellerNotes = notes;
        this.saveOrders();
    }
    
    printModal() {
        // Hide action buttons and header actions during print
        const actionButtons = document.querySelector('.action-buttons');
        const headerActions = document.querySelector('.modal-header-actions');
        const originalActionDisplay = actionButtons.style.display;
        const originalHeaderDisplay = headerActions.style.display;
        
        actionButtons.style.display = 'none';
        headerActions.style.display = 'none';
        
        // Print
        window.print();
        
        // Restore buttons after print
        setTimeout(() => {
            actionButtons.style.display = originalActionDisplay;
            headerActions.style.display = originalHeaderDisplay;
        }, 1000);
    }
    
    async saveModalAsImage() {
        try {
            // Show loading state
            const saveBtn = document.getElementById('saveBtn');
            const originalContent = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            saveBtn.disabled = true;
            
            // Import html2canvas dynamically
            if (!window.html2canvas) {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                document.head.appendChild(script);
                
                await new Promise((resolve) => {
                    script.onload = resolve;
                });
            }
            
            // Get the modal content
            const modal = document.querySelector('.invoice-modal');
            
            // Hide action buttons temporarily
            const actionButtons = document.querySelector('.action-buttons');
            const headerActions = document.querySelector('.modal-header-actions');
            const originalActionDisplay = actionButtons.style.display;
            const originalHeaderDisplay = headerActions.style.display;
            
            actionButtons.style.display = 'none';
            headerActions.style.display = 'none';
            
            // Capture the modal
            const canvas = await html2canvas(modal, {
                backgroundColor: '#ffffff',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: modal.offsetWidth,
                height: modal.offsetHeight
            });
            
            // Restore buttons
            actionButtons.style.display = originalActionDisplay;
            headerActions.style.display = originalHeaderDisplay;
            
            // Create download link
            const link = document.createElement('a');
            link.download = `invoice-${this.currentOrder.id}-${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL('image/png');
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success notification
            this.showNotification('تم حفظ الفاتورة كصورة بنجاح!');
            
        } catch (error) {
            console.error('Error saving modal as image:', error);
            this.showNotification('حدث خطأ أثناء حفظ الصورة');
        } finally {
            // Restore button
            const saveBtn = document.getElementById('saveBtn');
            saveBtn.innerHTML = originalContent;
            saveBtn.disabled = false;
        }
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
    
    // Initialize table headers translation
    window.langManager.updateTableHeaders();
    
    // Show scroll hint on mobile
    const scrollHint = document.getElementById('scrollHint');
    if (scrollHint && window.innerWidth <= 768) {
        scrollHint.classList.add('show');
        
        // Hide after 4 seconds or on scroll
        const hideHint = () => {
            scrollHint.classList.remove('show');
        };
        
        setTimeout(hideHint, 4000);
        
        const tableContainer = document.querySelector('.table-container');
        tableContainer.addEventListener('scroll', hideHint, { once: true });
    }
    
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
