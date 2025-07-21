// Language Management
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'fr';
        this.translations = {
            fr: {
                // Header
                dashboard: "Tableau de bord",
                settings: "Paramètres",
                logout: "Déconnexion",
                
                // Page Title
                pageTitle: "Gestion des Commandes",
                
                // Stats
                newOrders: "Nouvelles",
                processing: "En cours",
                shipped: "Expédiées",
                completed: "Terminées",
                
                // Search and Filters
                searchPlaceholder: "Rechercher par nom, téléphone, wilaya ou produit...",
                allStatuses: "Tous les statuts",
                new: "Nouveau",
                processing: "En cours",
                shipped: "Expédié",
                completed: "Terminé",
                cancelled: "Annulé",
                statusReturn: "Retour",
                statusExchange: "Échange",
                to: "à",
                
                // Buttons
                export: "Exporter",
                addTestOrder: "Commande test",
                addManually: "Ajouter manuellement",
                
                // Table Headers
                id: "ID",
                nom: "Nom",
                phone: "Téléphone",
                wilaya: "Wilaya",
                produit: "Produit",
                variants: "Variantes",
                quantity: "Qté",
                total: "Total",
                date: "Date",
                statut: "Statut",
                action: "Action",
                
                // Modal
                invoiceTitle: "Confirmation de Commande",
                print: "Imprimer",
                save: "Sauvegarder",
                close: "Fermer",
                produit: "Produit",
                variantes: "Variantes",
                quantite: "Quantité",
                nom: "Nom",
                telephone: "Téléphone",
                wilaya: "Wilaya",
                commune: "Commune",
                prixProduit: "Prix produit",
                fraisLivraison: "Frais de livraison",
                total: "Total",
                callClient: "Appeler le client",
                memos: "Mémos / Notes",
                delete: "Supprimer",
                
                // Manual Order Form
                addNewOrder: "Ajouter une nouvelle commande",
                customerName: "Nom du client",
                phone: "Téléphone",
                wilaya: "Wilaya",
                city: "Commune",
                product: "Produit",
                variants: "Variantes",
                quantity: "Quantité",
                totalPrice: "Prix total (€)",
                customerNotes: "Notes du client",
                cancelOrder: "Annuler",
                saveOrder: "Enregistrer",
                
                // Confirmation Dialog
                confirmDeleteTitle: "Confirmer la suppression",
                confirmDelete: "Êtes-vous sûr de vouloir supprimer cette commande ?",
                confirmDeleteMessage: "Cette action est irréversible.",
                cancel: "Annuler",
                confirm: "Supprimer",
                
                // Status Change Modal
                changeStatus: "Changer le statut",
                selectNewStatus: "Sélectionnez le nouveau statut :",
                notifyWhatsApp: "Notifier le client via WhatsApp",
                whatsappMessage: "Un message sera envoyé au client pour l'informer du changement de statut.",
                updateStatus: "Mettre à jour",
                
                // Notifications
                orderDeleted: "Commande supprimée avec succès",
                statusUpdated: "Statut mis à jour avec succès",
                whatsappSent: "Message WhatsApp envoyé avec succès",
                whatsappError: "Erreur lors de l'envoi du message WhatsApp",
                orderSaved: "Commande enregistrée avec succès",
                
                // Notes
                notesPlaceholder: "Ajoutez vos notes ici...",
                quickNote1: "❌ N'a pas répondu",
                quickNote2: "☎ Appelé avec succès",
                quickNote3: "⏳ Rappeler plus tard"
            },
            en: {
                // Header
                dashboard: "Dashboard",
                settings: "Settings",
                logout: "Logout",
                
                // Page Title
                pageTitle: "Order Management",
                
                // Stats
                newOrders: "New",
                processing: "Processing",
                shipped: "Shipped",
                completed: "Completed",
                
                // Search and Filters
                searchPlaceholder: "Search by name, phone, wilaya or product...",
                allStatuses: "All statuses",
                new: "New",
                processing: "Processing",
                shipped: "Shipped",
                completed: "Completed",
                cancelled: "Cancelled",
                statusReturn: "Return",
                statusExchange: "Exchange",
                to: "to",
                
                // Buttons
                export: "Export",
                addTestOrder: "Test Order",
                addManually: "Add Manually",
                
                // Table Headers
                id: "ID",
                nom: "Name",
                phone: "Phone",
                wilaya: "Wilaya",
                produit: "Product",
                variants: "Variants",
                quantity: "Qty",
                total: "Total",
                date: "Date",
                statut: "Status",
                action: "Action",
                
                // Modal
                invoiceTitle: "Order Confirmation",
                print: "Print",
                save: "Save",
                close: "Close",
                produit: "Product",
                variantes: "Variants",
                quantite: "Quantity",
                nom: "Name",
                telephone: "Phone",
                wilaya: "Wilaya",
                commune: "City",
                prixProduit: "Product price",
                fraisLivraison: "Delivery fee",
                total: "Total",
                callClient: "Call Client",
                memos: "Memos / Notes",
                delete: "Delete",
                
                // Manual Order Form
                addNewOrder: "Add New Order",
                customerName: "Customer Name",
                phone: "Phone",
                wilaya: "Wilaya",
                city: "City",
                product: "Product",
                variants: "Variants",
                quantity: "Quantity",
                totalPrice: "Total Price (€)",
                customerNotes: "Customer Notes",
                cancelOrder: "Cancel",
                saveOrder: "Save",
                
                // Confirmation Dialog
                confirmDeleteTitle: "Confirm Deletion",
                confirmDelete: "Are you sure you want to delete this order?",
                confirmDeleteMessage: "This action cannot be undone.",
                cancel: "Cancel",
                confirm: "Delete",
                
                // Status Change Modal
                changeStatus: "Change Status",
                selectNewStatus: "Select new status:",
                notifyWhatsApp: "Notify customer via WhatsApp",
                whatsappMessage: "A message will be sent to the customer to inform them of the status change.",
                updateStatus: "Update",
                
                // Notifications
                orderDeleted: "Order deleted successfully",
                statusUpdated: "Status updated successfully",
                whatsappSent: "WhatsApp message sent successfully",
                whatsappError: "Error sending WhatsApp message",
                orderSaved: "Order saved successfully",
                
                // Notes
                notesPlaceholder: "Add your notes here...",
                quickNote1: "❌ No answer",
                quickNote2: "☎ Called successfully",
                quickNote3: "⏳ Call back later"
            }
        };
        this.init();
    }

    init() {
        this.updateLanguageToggle();
        this.translatePage();
        this.bindEvents();
    }

    bindEvents() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
        localStorage.setItem('language', this.currentLanguage);
        this.updateLanguageToggle();
        this.translatePage();
        
        // Update status dropdowns if they exist
        this.updateStatusDropdowns();
    }

    updateLanguageToggle() {
        const langText = document.getElementById('langText');
        if (langText) {
            langText.textContent = this.currentLanguage === 'fr' ? 'Français' : 'English';
        }
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-key-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-key-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }

    updateStatusDropdowns() {
        // Update status filter dropdown
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            const options = statusFilter.querySelectorAll('option');
            options.forEach(option => {
                const key = option.getAttribute('data-key');
                if (key) {
                    const translation = this.getTranslation(key);
                    if (translation) {
                        option.textContent = translation;
                    }
                }
            });
        }

        // Update status change modal dropdown if it exists
        const statusChangeSelect = document.getElementById('statusChangeSelect');
        if (statusChangeSelect) {
            const options = statusChangeSelect.querySelectorAll('option');
            options.forEach(option => {
                const key = option.getAttribute('data-key');
                if (key) {
                    const translation = this.getTranslation(key);
                    if (translation) {
                        option.textContent = translation;
                    }
                }
            });
        }
    }

    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Order Management System
class OrderManager {
    constructor() {
        this.orders = this.loadOrders();
        this.filteredOrders = [...this.orders];
        this.currentOrder = null;
        this.languageManager = new LanguageManager();
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderOrders();
        this.updateStats();
        this.setupScrollHint();
    }

    loadOrders() {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            return JSON.parse(savedOrders);
        }
        
        // Sample data
        return [
            {
                id: 1,
                nom: "Ahmed Benali",
                telephone: "+213 555 123 456",
                wilaya: "Alger",
                commune: "Bab Ezzouar",
                produit: "Montre Élégante",
                variantes: "Couleur: Or, Taille: M",
                quantite: 1,
                prixProduit: 89.99,
                fraisLivraison: 10.00,
                total: 99.99,
                date: "2024-01-15",
                statut: "new",
                notes: "",
                isRead: false
            },
            {
                id: 2,
                nom: "Fatima Zohra",
                telephone: "+213 666 789 012",
                wilaya: "Oran",
                commune: "Es Senia",
                produit: "Bracelet Premium",
                variantes: "Couleur: Argent, Taille: L",
                quantite: 2,
                prixProduit: 129.98,
                fraisLivraison: 15.00,
                total: 144.98,
                date: "2024-01-14",
                statut: "processing",
                notes: "",
                isRead: true
            },
            {
                id: 3,
                nom: "Mohamed Krim",
                telephone: "+213 777 345 678",
                wilaya: "Constantine",
                commune: "Ali Mendjeli",
                produit: "Collier Luxe",
                variantes: "Couleur: Rose Gold, Longueur: 45cm",
                quantite: 1,
                prixProduit: 199.99,
                fraisLivraison: 20.00,
                total: 219.99,
                date: "2024-01-13",
                statut: "shipped",
                notes: "",
                isRead: true
            }
        ];
    }

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filter functionality
        const statusFilter = document.getElementById('statusFilter');
        const dateFrom = document.getElementById('dateFrom');
        const dateTo = document.getElementById('dateTo');

        if (statusFilter) statusFilter.addEventListener('change', () => this.applyFilters());
        if (dateFrom) dateFrom.addEventListener('change', () => this.applyFilters());
        if (dateTo) dateTo.addEventListener('change', () => this.applyFilters());

        // Modal events
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modalClose) modalClose.addEventListener('click', () => this.closeModal());
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) this.closeModal();
            });
        }

        // Action buttons
        const addTestOrderBtn = document.getElementById('addTestOrderBtn');
        const addManualOrderBtn = document.getElementById('addManualOrderBtn');
        const cancelManualOrder = document.getElementById('cancelManualOrder');
        const saveManualOrder = document.getElementById('saveManualOrder');

        if (addTestOrderBtn) addTestOrderBtn.addEventListener('click', () => this.addTestOrder());
        if (addManualOrderBtn) addManualOrderBtn.addEventListener('click', () => this.showManualOrderForm());
        if (cancelManualOrder) cancelManualOrder.addEventListener('click', () => this.hideManualOrderForm());
        if (saveManualOrder) saveManualOrder.addEventListener('click', () => this.saveManualOrder());

        // Modal action buttons
        const callBtn = document.getElementById('callBtn');
        const addNotesBtn = document.getElementById('addNotesBtn');
        const deleteOrderBtn = document.getElementById('deleteOrderBtn');

        if (callBtn) callBtn.addEventListener('click', () => this.callClient());
        if (addNotesBtn) addNotesBtn.addEventListener('click', () => this.toggleNotes());
        if (deleteOrderBtn) deleteOrderBtn.addEventListener('click', () => this.showDeleteConfirmation());

        // Confirmation dialog
        const cancelDelete = document.getElementById('cancelDelete');
        const confirmDelete = document.getElementById('confirmDelete');

        if (cancelDelete) cancelDelete.addEventListener('click', () => this.hideDeleteConfirmation());
        if (confirmDelete) confirmDelete.addEventListener('click', () => this.deleteOrder());

        // Notes functionality
        const notesTextarea = document.getElementById('notesTextarea');
        if (notesTextarea) {
            notesTextarea.addEventListener('input', (e) => this.updateOrderNotes(e.target.value));
        }

        // Quick notes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-note-btn')) {
                const note = e.target.getAttribute('data-note');
                this.addQuickNote(note);
            }
        });

        // User menu
        const menuToggle = document.getElementById('menuToggle');
        const dropdownMenu = document.getElementById('dropdownMenu');

        if (menuToggle && dropdownMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                dropdownMenu.classList.remove('show');
            });
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.filteredOrders = [...this.orders];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredOrders = this.orders.filter(order => 
                order.nom.toLowerCase().includes(searchTerm) ||
                order.telephone.toLowerCase().includes(searchTerm) ||
                order.wilaya.toLowerCase().includes(searchTerm) ||
                order.produit.toLowerCase().includes(searchTerm) ||
                order.id.toString().includes(searchTerm)
            );
        }
        this.renderOrders();
    }

    applyFilters() {
        const statusFilter = document.getElementById('statusFilter').value;
        const dateFrom = document.getElementById('dateFrom').value;
        const dateTo = document.getElementById('dateTo').value;

        this.filteredOrders = this.orders.filter(order => {
            let matches = true;

            if (statusFilter && order.statut !== statusFilter) {
                matches = false;
            }

            if (dateFrom && order.date < dateFrom) {
                matches = false;
            }

            if (dateTo && order.date > dateTo) {
                matches = false;
            }

            return matches;
        });

        this.renderOrders();
    }

    renderOrders() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.filteredOrders.forEach(order => {
            const row = this.createOrderRow(order);
            tbody.appendChild(row);
        });
    }

    createOrderRow(order) {
        const row = document.createElement('tr');
        if (!order.isRead) {
            row.classList.add('unread');
        }

        row.innerHTML = `
            <td class="col-id">${order.id}</td>
            <td class="col-nom">${order.nom}</td>
            <td class="col-phone">${order.telephone}</td>
            <td class="col-wilaya">${order.wilaya}</td>
            <td class="col-produit">
                <span class="truncate" title="${order.produit}">${order.produit}</span>
            </td>
            <td class="col-variants">
                <span class="truncate" title="${order.variantes}">${order.variantes}</span>
            </td>
            <td class="col-quantity">${order.quantite}</td>
            <td class="col-total">€${order.total.toFixed(2)}</td>
            <td class="col-date">${this.formatDate(order.date)}</td>
            <td class="col-statut">
                <div class="status-dropdown">
                    <select class="status-select" data-order-id="${order.id}">
                        <option value="new" ${order.statut === 'new' ? 'selected' : ''} data-key="new">Nouveau</option>
                        <option value="processing" ${order.statut === 'processing' ? 'selected' : ''} data-key="processing">En cours</option>
                        <option value="shipped" ${order.statut === 'shipped' ? 'selected' : ''} data-key="shipped">Expédié</option>
                        <option value="completed" ${order.statut === 'completed' ? 'selected' : ''} data-key="completed">Terminé</option>
                        <option value="cancelled" ${order.statut === 'cancelled' ? 'selected' : ''} data-key="cancelled">Annulé</option>
                        <option value="return" ${order.statut === 'return' ? 'selected' : ''} data-key="statusReturn">Retour</option>
                        <option value="exchange" ${order.statut === 'exchange' ? 'selected' : ''} data-key="statusExchange">Échange</option>
                    </select>
                    <div class="status-display ${order.statut}">
                        <span>${this.getStatusText(order.statut)}</span>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div>
            </td>
            <td class="col-action">
                <button class="action-btn" onclick="orderManager.openOrderModal(${order.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;

        // Add status change event listener
        const statusSelect = row.querySelector('.status-select');
        statusSelect.addEventListener('change', (e) => {
            const newStatus = e.target.value;
            if (newStatus !== order.statut) {
                this.showStatusChangeModal(order.id, newStatus, order.statut);
                // Reset to original value until confirmed
                e.target.value = order.statut;
            }
        });

        return row;
    }

    getStatusText(status) {
        const statusTexts = {
            new: this.languageManager.getTranslation('new'),
            processing: this.languageManager.getTranslation('processing'),
            shipped: this.languageManager.getTranslation('shipped'),
            completed: this.languageManager.getTranslation('completed'),
            cancelled: this.languageManager.getTranslation('cancelled'),
            return: this.languageManager.getTranslation('statusReturn'),
            exchange: this.languageManager.getTranslation('statusExchange')
        };
        return statusTexts[status] || status;
    }

    showStatusChangeModal(orderId, newStatus, currentStatus) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        // Create status change modal
        const modalHTML = `
            <div class="modal-overlay show" id="statusChangeModal" style="z-index: 3000;">
                <div class="status-change-modal">
                    <div class="modal-header">
                        <h3>${this.languageManager.getTranslation('changeStatus')}</h3>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="status-change-content">
                            <div class="current-order-info">
                                <h4>${order.nom} - ${this.languageManager.getTranslation('id')} #${order.id}</h4>
                                <p>${order.produit}</p>
                            </div>
                            
                            <div class="status-selection">
                                <label>${this.languageManager.getTranslation('selectNewStatus')}</label>
                                <select id="statusChangeSelect" class="status-change-select">
                                    <option value="new" ${newStatus === 'new' ? 'selected' : ''}>${this.languageManager.getTranslation('new')}</option>
                                    <option value="processing" ${newStatus === 'processing' ? 'selected' : ''}>${this.languageManager.getTranslation('processing')}</option>
                                    <option value="shipped" ${newStatus === 'shipped' ? 'selected' : ''}>${this.languageManager.getTranslation('shipped')}</option>
                                    <option value="completed" ${newStatus === 'completed' ? 'selected' : ''}>${this.languageManager.getTranslation('completed')}</option>
                                    <option value="cancelled" ${newStatus === 'cancelled' ? 'selected' : ''}>${this.languageManager.getTranslation('cancelled')}</option>
                                    <option value="return" ${newStatus === 'return' ? 'selected' : ''}>${this.languageManager.getTranslation('statusReturn')}</option>
                                    <option value="exchange" ${newStatus === 'exchange' ? 'selected' : ''}>${this.languageManager.getTranslation('statusExchange')}</option>
                                </select>
                            </div>
                            
                            <div class="whatsapp-notification">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="notifyWhatsApp">
                                    <span class="checkmark"></span>
                                    <span>${this.languageManager.getTranslation('notifyWhatsApp')}</span>
                                </label>
                                <p class="whatsapp-info">${this.languageManager.getTranslation('whatsappMessage')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">${this.languageManager.getTranslation('cancel')}</button>
                        <button class="btn btn-primary" onclick="orderManager.confirmStatusChange(${orderId})">${this.languageManager.getTranslation('updateStatus')}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    confirmStatusChange(orderId) {
        const modal = document.getElementById('statusChangeModal');
        const newStatus = document.getElementById('statusChangeSelect').value;
        const notifyWhatsApp = document.getElementById('notifyWhatsApp').checked;

        // Update order status
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.statut = newStatus;
            this.saveOrders();
            this.renderOrders();
            this.updateStats();

            // Show success notification
            this.showNotification(this.languageManager.getTranslation('statusUpdated'), 'success');

            // Send WhatsApp notification if requested
            if (notifyWhatsApp) {
                this.sendWhatsAppNotification(order, newStatus);
            }
        }

        // Close modal
        modal.remove();
    }

    sendWhatsAppNotification(order, status) {
        // Simulate WhatsApp API call
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            if (success) {
                this.showNotification(this.languageManager.getTranslation('whatsappSent'), 'success');
            } else {
                this.showNotification(this.languageManager.getTranslation('whatsappError'), 'error');
            }
        }, 1000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
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
            this.updateStats();
        }

        // Populate modal with order data
        this.populateModal(order);
        
        // Show modal
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.add('show');
        }
    }

    populateModal(order) {
        // Update modal content
        document.getElementById('produitValue').textContent = order.produit;
        document.getElementById('couleurValue').textContent = order.variantes;
        document.getElementById('quantiteValue').textContent = order.quantite;
        document.getElementById('nomValue').textContent = order.nom;
        document.getElementById('telephoneValue').textContent = order.telephone;
        document.getElementById('wilayaValue').textContent = order.wilaya;
        document.getElementById('communeValue').textContent = order.commune;
        document.getElementById('prixProduitValue').textContent = `€${order.prixProduit.toFixed(2)}`;
        document.getElementById('fraisLivraisonValue').textContent = `€${order.fraisLivraison.toFixed(2)}`;
        document.getElementById('totalValue').textContent = `€${order.total.toFixed(2)}`;

        // Update notes
        const notesTextarea = document.getElementById('notesTextarea');
        if (notesTextarea) {
            notesTextarea.value = order.notes || '';
            notesTextarea.placeholder = this.languageManager.getTranslation('notesPlaceholder');
        }

        // Update quick note buttons
        const quickNoteButtons = document.querySelectorAll('.quick-note-btn');
        quickNoteButtons.forEach((btn, index) => {
            const noteKey = `quickNote${index + 1}`;
            const translation = this.languageManager.getTranslation(noteKey);
            btn.textContent = translation;
            btn.setAttribute('data-note', translation);
        });
    }

    closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('show');
        }
        this.currentOrder = null;
    }

    callClient() {
        if (!this.currentOrder) return;
        
        const phoneNumber = this.currentOrder.telephone.replace(/\s+/g, '');
        window.open(`tel:${phoneNumber}`, '_self');
        
        // Add note about the call
        const callNote = this.languageManager.getTranslation('quickNote2');
        this.addQuickNote(callNote);
    }

    toggleNotes() {
        const notesSection = document.getElementById('notesSection');
        if (notesSection) {
            notesSection.classList.toggle('show');
        }
    }

    updateOrderNotes(notes) {
        if (this.currentOrder) {
            this.currentOrder.notes = notes;
            this.saveOrders();
        }
    }

    addQuickNote(note) {
        const notesTextarea = document.getElementById('notesTextarea');
        if (notesTextarea && this.currentOrder) {
            const currentNotes = notesTextarea.value;
            const timestamp = new Date().toLocaleString();
            const newNote = `[${timestamp}] ${note}`;
            
            notesTextarea.value = currentNotes ? `${currentNotes}\n${newNote}` : newNote;
            this.updateOrderNotes(notesTextarea.value);
        }
    }

    showDeleteConfirmation() {
        const confirmationDialog = document.getElementById('confirmationDialog');
        if (confirmationDialog) {
            confirmationDialog.classList.add('show');
        }
    }

    hideDeleteConfirmation() {
        const confirmationDialog = document.getElementById('confirmationDialog');
        if (confirmationDialog) {
            confirmationDialog.classList.remove('show');
        }
    }

    deleteOrder() {
        if (!this.currentOrder) return;

        const orderIndex = this.orders.findIndex(o => o.id === this.currentOrder.id);
        if (orderIndex > -1) {
            this.orders.splice(orderIndex, 1);
            this.saveOrders();
            this.renderOrders();
            this.updateStats();
            this.closeModal();
            this.hideDeleteConfirmation();
            
            this.showNotification(this.languageManager.getTranslation('orderDeleted'), 'success');
        }
    }

    addTestOrder() {
        const newOrder = {
            id: Math.max(...this.orders.map(o => o.id)) + 1,
            nom: "Test Client",
            telephone: "+213 555 000 000",
            wilaya: "Test Wilaya",
            commune: "Test Commune",
            produit: "Produit Test",
            variantes: "Test Variant",
            quantite: 1,
            prixProduit: 50.00,
            fraisLivraison: 10.00,
            total: 60.00,
            date: new Date().toISOString().split('T')[0],
            statut: "new",
            notes: "",
            isRead: false
        };

        this.orders.unshift(newOrder);
        this.saveOrders();
        this.renderOrders();
        this.updateStats();
        
        this.showNotification(this.languageManager.getTranslation('orderSaved'), 'success');
    }

    showManualOrderForm() {
        const form = document.getElementById('manualOrderForm');
        if (form) {
            form.classList.add('show');
        }
    }

    hideManualOrderForm() {
        const form = document.getElementById('manualOrderForm');
        if (form) {
            form.classList.remove('show');
            this.clearManualOrderForm();
        }
    }

    clearManualOrderForm() {
        const inputs = document.querySelectorAll('#manualOrderForm input, #manualOrderForm textarea');
        inputs.forEach(input => {
            if (input.type === 'number') {
                input.value = input.id === 'manualQuantity' ? '1' : '';
            } else {
                input.value = '';
            }
        });
    }

    saveManualOrder() {
        const formData = {
            nom: document.getElementById('manualCustomerName').value,
            telephone: document.getElementById('manualPhone').value,
            wilaya: document.getElementById('manualWilaya').value,
            commune: document.getElementById('manualCity').value,
            produit: document.getElementById('manualProduct').value,
            variantes: document.getElementById('manualVariants').value,
            quantite: parseInt(document.getElementById('manualQuantity').value),
            total: parseFloat(document.getElementById('manualTotal').value),
            notes: document.getElementById('manualNotes').value
        };

        // Validation
        if (!formData.nom || !formData.telephone || !formData.wilaya || !formData.commune || 
            !formData.produit || !formData.quantite || !formData.total) {
            alert('Please fill in all required fields');
            return;
        }

        const newOrder = {
            id: Math.max(...this.orders.map(o => o.id)) + 1,
            ...formData,
            prixProduit: formData.total - 10, // Assuming 10€ delivery fee
            fraisLivraison: 10.00,
            date: new Date().toISOString().split('T')[0],
            statut: "new",
            isRead: false
        };

        this.orders.unshift(newOrder);
        this.saveOrders();
        this.renderOrders();
        this.updateStats();
        this.hideManualOrderForm();
        
        this.showNotification(this.languageManager.getTranslation('orderSaved'), 'success');
    }

    updateStats() {
        const stats = {
            new: this.orders.filter(o => o.statut === 'new').length,
            processing: this.orders.filter(o => o.statut === 'processing').length,
            shipped: this.orders.filter(o => o.statut === 'shipped').length,
            completed: this.orders.filter(o => o.statut === 'completed').length
        };

        document.getElementById('newOrdersCount').textContent = stats.new;
        document.getElementById('processingOrdersCount').textContent = stats.processing;
        document.getElementById('shippedOrdersCount').textContent = stats.shipped;
        document.getElementById('completedOrdersCount').textContent = stats.completed;
    }

    setupScrollHint() {
        const tableContainer = document.querySelector('.table-container');
        const scrollHint = document.getElementById('scrollHint');
        
        if (tableContainer && scrollHint) {
            const checkScroll = () => {
                const canScrollHorizontally = tableContainer.scrollWidth > tableContainer.clientWidth;
                const isAtStart = tableContainer.scrollLeft === 0;
                
                if (canScrollHorizontally && isAtStart && window.innerWidth < 1024) {
                    scrollHint.classList.add('show');
                    setTimeout(() => {
                        scrollHint.classList.remove('show');
                    }, 3000);
                }
            };

            tableContainer.addEventListener('scroll', () => {
                scrollHint.classList.remove('show');
            });

            // Check on load and resize
            checkScroll();
            window.addEventListener('resize', checkScroll);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the application
let orderManager;
document.addEventListener('DOMContentLoaded', () => {
    orderManager = new OrderManager();
});
