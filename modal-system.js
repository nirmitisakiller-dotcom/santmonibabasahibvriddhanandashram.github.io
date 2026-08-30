(function () {
    'use strict';

    function createModal(id, title, bodyHtml) {
        if (document.getElementById(id)) return document.getElementById(id);

        var modal = document.createElement('div');
        modal.id = id;
        modal.innerHTML = '<div><h2 style="color:#7a2014;text-align:center;margin-top:0;">' + title + '</h2>' + bodyHtml + '</div>';
        document.body.appendChild(modal);
        return modal;
    }

    function createVolunteerModalIfMissing() {
        return createModal('volunteerModal', 'Become a Volunteer', `
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
                <button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;">Submit Application</button>
                <button type="button" onclick="closeSiteModal('volunteerModal')" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:10px;">Close</button>
            </form>`);
    }

    function createRegisterModalIfMissing() {
        return createModal('registerModal', 'Register Loved Ones', `
            <form>
                <label><strong>Full Name</strong></label>
                <input type="text" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">
                <label><strong>Mobile Number</strong></label>
                <input type="tel" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">
                <label><strong>Details</strong></label>
                <textarea required rows="4" style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;resize:vertical;"></textarea>
                <button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;">Submit Registration</button>
                <button type="button" onclick="closeSiteModal('registerModal')" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:10px;">Close</button>
            </form>`);
    }

    function createDonationModalIfMissing() {
        return createModal('donateModal', 'Donation Details', `
            <div style="text-align:center;">
                <p style="color:#555;line-height:1.5;">Your support helps the Ashram continue its service to elderly people and daily Langar Seva.</p>
                <div style="text-align:center;margin-top:20px;padding:18px;background:#fff9f2;border:2px solid #ffdec2;border-radius:10px;">
                    <h3 style="margin:0 0 12px;color:#7a2014;">Scan to Donate</h3>
                    <img src="IMG-20260828-WA0003.jpg" alt="Donation QR Code" style="display:block;width:min(320px,100%);height:auto;margin:0 auto;border-radius:8px;">
                    <p style="margin:12px 0 0;color:#555;font-weight:bold;">Scan this QR code to make a donation.</p>
                </div>
                <button type="button" onclick="closeSiteModal('donateModal')" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:15px;">Close</button>
            </div>`);
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
            closeButton.addEventListener('click', function () { closeSiteModal(modalId); });
            panel.insertBefore(closeButton, panel.firstChild);
        }

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeSiteModal(modalId);
        });

        return { modal: modal };
    }

    function closeSiteModal(id) {
        var modal = document.getElementById(id);
        if (modal) modal.style.display = 'none';
        updateBodyScroll();
    }

    function updateBodyScroll() {
        var open = Array.prototype.some.call(document.querySelectorAll('[role="dialog"]'), function (modal) {
            return modal.style.display !== 'none';
        });
        document.body.style.overflow = open ? 'hidden' : '';
    }

    window.closeSiteModal = closeSiteModal;

    // Kept global because the existing volunteer form uses an inline onchange handler.
    window.toggleAttachmentFields = function (value) {
        var box = document.getElementById('attachmentsBox');
        var app = document.getElementById('appFormUpload');
        var aadhaar = document.getElementById('aadhaarUpload');
        if (!box) return;

        var showAttachments = value === 'Internship' || value === 'Other';
        box.style.display = showAttachments ? 'block' : 'none';
        if (app) app.style.display = value === 'Internship' ? 'block' : 'none';
        if (aadhaar) aadhaar.style.display = showAttachments ? 'block' : 'none';
    };

    function attachFormBehavior(modal) {
        if (!modal) return;
        var form = modal.querySelector('form');
        if (!form || form.dataset.modalFormReady === 'true') return;
        form.dataset.modalFormReady = 'true';
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            var message = modal.id === 'registerModal'
                ? 'Thank you. Your registration form has been received.'
                : 'Thank you for volunteering. Your application has been received.';
            alert(message);
            form.reset();
            closeSiteModal(modal.id);
        });
    }

    function init() {
        createVolunteerModalIfMissing();
        createRegisterModalIfMissing();
        createDonationModalIfMissing();

        var instances = [
            setupModal('registerModal', 'Register Loved Ones', 'Close registration form', 'register-modal-close'),
            setupModal('volunteerModal', 'Volunteer', 'Close volunteer form', 'volunteer-modal-close'),
            setupModal('donateModal', 'Donation Details', 'Close donation details', 'donation-modal-close'),
            setupModal('donationModal', 'Donation Details', 'Close donation details', 'donation-modal-close')
        ].filter(Boolean);

        instances.forEach(function (instance) {
            attachFormBehavior(instance.modal);
            var observer = new MutationObserver(updateBodyScroll);
            observer.observe(instance.modal, { attributes: true, attributeFilter: ['style'] });
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
        var openModals = document.querySelectorAll('[role="dialog"]');
        for (var i = 0; i < openModals.length; i++) {
            if (openModals[i].style.display !== 'none') {
                closeSiteModal(openModals[i].id);
                break;
            }
        }
    });
}());