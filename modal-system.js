(function () {
    'use strict';

    function createVolunteerModalIfMissing() {
        if (document.getElementById('volunteerModal')) return;

        var modal = document.createElement('div');
        modal.id = 'volunteerModal';
        modal.innerHTML = `
            <div>
                <h2 style="color:#7a2014;text-align:center;margin-top:0;">Become a Volunteer</h2>
                <form>
                    <label><strong>Full Name</strong></label>
                    <input type="text" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">

                    <label><strong>Mobile Number</strong></label>
                    <input type="tel" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">

                    <label><strong>Purpose of Service</strong></label>
                    <select onchange="toggleAttachmentFields(this.value)" style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">
                        <option value="">Select</option>
                        <option value="Internship">Internship</option>
                        <option value="General Help">General Help</option>
                        <option value="Other">Other</option>
                    </select>

                    <div id="attachmentsBox" style="display:none;">
                        <div id="appFormUpload" style="display:none;">
                            <label><strong>Application Form</strong></label>
                            <input type="file" id="appFileInput" style="width:100%;margin:8px 0 15px;">
                        </div>
                        <div id="aadhaarUpload" style="display:none;">
                            <label><strong>Aadhaar Card</strong></label>
                            <input type="file" id="aadhaarInput" style="width:100%;margin:8px 0 15px;">
                        </div>
                    </div>

                    <button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;">
                        Submit Application
                    </button>
                    <button type="button" onclick="document.getElementById('volunteerModal').style.display='none'" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:10px;">
                        Close
                    </button>
                </form>
            </div>`;
        document.body.appendChild(modal);
    }

    function setupModal(modalId, ariaLabel, closeLabel, closeClass) {
        var modal = document.getElementById(modalId);
        if (!modal || modal.dataset.modalSystemReady === 'true') return null;

        modal.dataset.modalSystemReady = 'true';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', ariaLabel);

        Object.assign(modal.style, {
            display: modal.style.display || 'none',
            position: 'fixed',
            inset: '0',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            padding: '20px',
            backgroundColor: 'rgba(0,0,0,0.65)',
            zIndex: '2000',
            alignItems: 'center',
            justifyContent: 'center',
            overflowY: 'auto'
        });

        var panel = modal.firstElementChild;
        if (panel) {
            Object.assign(panel.style, {
                position: 'relative',
                boxSizing: 'border-box',
                width: 'min(680px, 100%)',
                maxWidth: '680px',
                maxHeight: 'calc(100vh - 40px)',
                overflowY: 'auto',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                padding: '28px'
            });

            var closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = closeClass;
            closeButton.setAttribute('aria-label', closeLabel);
            closeButton.textContent = '×';
            Object.assign(closeButton.style, {
                position: 'absolute',
                top: '8px',
                right: '12px',
                width: '40px',
                height: '40px',
                border: '0',
                borderRadius: '50%',
                background: 'transparent',
                color: '#7a2014',
                fontSize: '32px',
                lineHeight: '40px',
                textAlign: 'center',
                cursor: 'pointer',
                zIndex: '2'
            });
            closeButton.addEventListener('click', closeModal);
            panel.insertBefore(closeButton, panel.firstChild);
        }

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });

        function closeModal() {
            modal.style.display = 'none';
            updateBodyScroll();
        }

        return { modal: modal, close: closeModal };
    }

    var modalInstances = [];

    function updateBodyScroll() {
        var anyOpen = modalInstances.some(function (instance) {
            return instance && instance.modal && instance.modal.style.display !== 'none';
        });
        document.body.style.overflow = anyOpen ? 'hidden' : '';
    }

    function init() {
        createVolunteerModalIfMissing();

        modalInstances = [
            setupModal('registerModal', 'Register Loved Ones', 'Close registration form', 'register-modal-close'),
            setupModal('volunteerModal', 'Volunteer', 'Close volunteer form', 'volunteer-modal-close')
        ].filter(Boolean);

        modalInstances.forEach(function (instance) {
            var observer = new MutationObserver(updateBodyScroll);
            observer.observe(instance.modal, {
                attributes: true,
                attributeFilter: ['style']
            });
        });

        updateBodyScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;

        var openModal = modalInstances.find(function (instance) {
            return instance && instance.modal && instance.modal.style.display !== 'none';
        });

        if (openModal) openModal.close();
    });
}());
