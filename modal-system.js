(function () {
    'use strict';

    function getModal(id) {
        return document.getElementById(id);
    }

    function openSiteModal(id) {
        var modal = getModal(id);
        if (!modal) return false;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return false;
    }

    function closeSiteModal(id) {
        var modal = getModal(id);
        if (modal) modal.style.display = 'none';
        var open = document.querySelector('[role="dialog"][style*="display: flex"]');
        if (!open) document.body.style.overflow = '';
    }

    window.openSiteModal = openSiteModal;
    window.closeSiteModal = closeSiteModal;

    window.toggleAttachmentFields = function (value) {
        var box = document.getElementById('attachmentsBox');
        var app = document.getElementById('appFormUpload');
        var aadhaar = document.getElementById('aadhaarUpload');
        if (!box) return;
        var show = value === 'Internship';
        box.style.display = show ? 'block' : 'none';
        if (app) app.style.display = show ? 'block' : 'none';
        if (aadhaar) aadhaar.style.display = show ? 'block' : 'none';
    };

    function styleModal(modal, label) {
        if (!modal || modal.dataset.modalSystemReady === 'true') return;
        modal.dataset.modalSystemReady = 'true';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', label);
        Object.assign(modal.style, {
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
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
                padding: '28px'
            });

            var close = document.createElement('button');
            close.type = 'button';
            close.textContent = '×';
            close.setAttribute('aria-label', 'Close');
            Object.assign(close.style, {
                position: 'absolute', top: '8px', right: '12px', width: '40px', height: '40px',
                border: '0', borderRadius: '50%', background: 'transparent', color: '#7a2014',
                fontSize: '32px', lineHeight: '40px', cursor: 'pointer', zIndex: '2'
            });
            close.addEventListener('click', function () { closeSiteModal(modal.id); });
            panel.insertBefore(close, panel.firstChild);
        }

        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeSiteModal(modal.id);
        });
    }

    function addSimpleModal(id, title, body) {
        if (getModal(id)) return;
        var modal = document.createElement('div');
        modal.id = id;
        modal.style.display = 'none';
        modal.innerHTML = '<div><h2 style="color:#7a2014;text-align:center;margin-top:0;">' + title + '</h2>' + body + '</div>';
        document.body.appendChild(modal);
    }

    function ensureModals() {
        if (!getModal('registerModal')) {
            addSimpleModal('registerModal', 'Register Loved Ones',
                '<form><label><strong>Full Name</strong></label><input type="text" name="full_name" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">' +
                '<label><strong>Mobile Number</strong></label><input type="tel" name="mobile" required style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;">' +
                '<label><strong>Details</strong></label><textarea name="details" required rows="4" style="width:100%;padding:12px;margin:8px 0 15px;box-sizing:border-box;resize:vertical;"></textarea>' +
                '<button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;">Submit Registration</button></form>');
        }

        if (!getModal('volunteerModal')) {
            addSimpleModal('volunteerModal', 'Volunteer Registration Form', '<p>Please fill in the volunteer application.</p>');
        }

        if (!getModal('donateModal')) {
            addSimpleModal('donateModal', 'Scan & Donate', '');
        }
    }

    function updateDonationModal(id) {
        var modal = getModal(id);
        if (!modal) return;
        var panel = modal.firstElementChild;
        if (!panel) return;
        panel.innerHTML = '<h2 style="color:#7a2014;text-align:center;margin-top:0;">Scan &amp; Donate</h2>' +
            '<div style="text-align:center;">' +
            '<p style="color:#555;line-height:1.5;">Support Langar Seva &amp; Elderly Care</p>' +
            '<div style="text-align:center;margin-top:20px;padding:18px;background:#fff9f2;border:2px solid #ffdec2;border-radius:10px;">' +
            '<h3 style="margin:0 0 12px;color:#7a2014;">Scan &amp; Donate</h3>' +
            '<img src="IMG-20260828-WA0003.jpg" alt="PhonePe Donation QR Code" style="display:block;width:min(320px,100%);height:auto;margin:0 auto;border-radius:8px;">' +
            '</div>' +
            '<button type="button" onclick="closeSiteModal(\'' + id + '\')" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:15px;">Close</button>' +
            '</div>';
    }

    function attachForm(modal) {
        if (!modal || modal.dataset.formReady === 'true') return;
        var form = modal.querySelector('form');
        if (!form) return;
        modal.dataset.formReady = 'true';
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            alert(modal.id === 'registerModal'
                ? 'Thank you. Your registration form has been received.'
                : 'Thank you for volunteering. Your application has been received.');
            form.reset();
            closeSiteModal(modal.id);
        });
    }

    function fixRegisterButton() {
        var links = document.querySelectorAll('a, button');
        for (var i = 0; i < links.length; i++) {
            var text = (links[i].textContent || '').trim();
            if (text === 'Register Loved Ones') {
                links[i].href = 'javascript:void(0);';
                links[i].onclick = function (event) {
                    if (event) event.preventDefault();
                    openSiteModal('registerModal');
                    return false;
                };
            }
        }
    }

    function init() {
        ensureModals();
        styleModal(getModal('registerModal'), 'Register Loved Ones');
        styleModal(getModal('volunteerModal'), 'Volunteer');
        styleModal(getModal('donateModal'), 'Scan & Donate');
        styleModal(getModal('donationModal'), 'Scan & Donate');

        updateDonationModal('donateModal');
        updateDonationModal('donationModal');

        attachForm(getModal('registerModal'));
        attachForm(getModal('volunteerModal'));
        fixRegisterButton();

        if (getModal('registerModal')) getModal('registerModal').style.display = 'none';
        if (getModal('donateModal')) getModal('donateModal').style.display = 'none';
        if (getModal('donationModal')) getModal('donationModal').style.display = 'none';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        var modals = document.querySelectorAll('[role="dialog"]');
        for (var i = 0; i < modals.length; i++) {
            if (modals[i].style.display !== 'none') {
                closeSiteModal(modals[i].id);
                break;
            }
        }
    });
}());
