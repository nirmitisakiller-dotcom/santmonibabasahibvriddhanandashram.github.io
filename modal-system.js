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
        return createModal('volunteerModal', 'Volunteer Registration Form', `
            <form action="https://formspree.io" method="POST" enctype="multipart/form-data">
                <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 12px; margin-bottom: 12px;">
                    <div>
                        <label style="display: block; font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #444444;">Full Name:</label>
                        <input type="text" name="volunteer_name" style="width: 100%; padding: 10px; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" required>
                    </div>
                    <div>
                        <label style="display: block; font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #444444;">Age:</label>
                        <input type="number" name="volunteer_age" style="width: 100%; padding: 10px; font-size: 1rem; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" required>
                    </div>
                </div>

                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #444444;">Current Occupation:</label>
                    <select name="volunteer_occupation" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; background: #fff;" required>
                        <option value="">-- Select Occupation --</option>
                        <option value="High School Student">High School Student</option>
                        <option value="College Student">College Student</option>
                        <option value="Post-Graduation Student">Post-Graduation Student</option>
                        <option value="Doing Job / Working Professional">Doing Job / Working Professional</option>
                    </select>
                </div>

                <div style="background: #ffffff; border: 1px solid #ffdec2; border-radius: 8px; padding: 12px; margin-bottom: 12px; box-sizing: border-box;">
                    <h5 style="margin: 0 0 10px 0; color: #7a2014; font-size: 0.95rem; border-bottom: 1px solid #ffdec2; padding-bottom: 4px;">Operational Help Categories</h5>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 8px; color: #444444;">
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; margin: 0;"><input type="checkbox" name="help_medical" value="Yes"> Medical / Nursing Support</label>
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; margin: 0;"><input type="checkbox" name="help_langar" value="Yes"> Langar Seva (Kitchen & Serving)</label>
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; margin: 0;"><input type="checkbox" name="help_companionship" value="Yes"> Elders Companionship & Interaction</label>
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; margin: 0;"><input type="checkbox" name="help_admin" value="Yes"> Administrative / IT Support</label>
                        <label style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; cursor: pointer; margin: 0; font-weight: bold; color: #7a2014; border-top: 1px dashed #ffdec2; padding-top: 4px;"><input type="checkbox" name="help_any_all" value="Yes"> All of the above / Any Option</label>
                    </div>
                </div>

                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #444444;">Purpose of Joining:</label>
                    <select id="volunteerPurpose" name="volunteer_purpose" onchange="toggleAttachmentFields(this.value)" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; background: #fff;" required>
                        <option value="">-- Select Purpose --</option>
                        <option value="General Help">General Help / Voluntary Service</option>
                        <option value="Internship">Official Internship Program</option>
                    </select>
                </div>

                <div id="attachmentsBox" style="display: none; background: #ffffff; border: 1px solid #ffdec2; border-radius: 8px; padding: 12px; margin-bottom: 12px; box-sizing: border-box;">
                    <h5 style="margin: 0 0 10px 0; color: #7a2014; font-size: 0.95rem; border-bottom: 1px solid #ffdec2; padding-bottom: 4px;">Required Document Uploads (PDF format)</h5>
                    <div id="appFormUpload" style="margin-bottom: 10px; display: none;">
                        <label style="display: block; font-size: 0.85rem; margin-bottom: 4px; color: #555555; font-weight: bold;">Upload Application Form (PDF):</label>
                        <input type="file" id="appFileInput" name="attachment_application_form" accept=".pdf" style="font-size: 0.85rem; width: 100%;">
                    </div>
                    <div id="aadhaarUpload" style="margin-bottom: 4px; display: none;">
                        <label style="display: block; font-size: 0.85rem; margin-bottom: 4px; color: #555555; font-weight: bold;">Upload Aadhaar Card (PDF):</label>
                        <input type="file" id="aadhaarInput" name="attachment_aadhaar_card" accept=".pdf" style="font-size: 0.85rem; width: 100%;">
                    </div>
                </div>

                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #444444;">Availability Schedule:</label>
                    <select name="volunteer_availability" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; background: #fff;" required>
                        <option value="">-- Select Schedule --</option>
                        <option value="Weekends Only (Sat / Sun)">Weekends Only (Sat / Sun)</option>
                        <option value="Weekdays Only (Mon to Fri)">Weekdays Only (Mon to Fri)</option>
                        <option value="Flexible / On-Call Support">Flexible / On-Call Support</option>
                    </select>
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 4px; font-weight: bold; color: #444444;">Brief Message / Past Experience:</label>
                    <textarea name="volunteer_experience_notes" rows="2" style="width: 100%; padding: 10px; font-size: 0.9rem; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box;" placeholder="Past work or remarks..."></textarea>
                </div>

                <button type="submit" style="background-color: #FF9933; color: white; border: none; padding: 12px; font-size: 1.1rem; font-weight: bold; border-radius: 6px; cursor: pointer; width: 100%;">Submit Application</button>
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

    function donationBodyHtml() {
        return `
            <div style="text-align:center;">
                <p style="color:#555;line-height:1.5;">Support Langar Seva &amp; Elderly Care</p>
                <div style="text-align:center;margin-top:20px;padding:18px;background:#fff9f2;border:2px solid #ffdec2;border-radius:10px;">
                    <h3 style="margin:0 0 12px;color:#7a2014;">Scan &amp; Donate</h3>
                    <img src="IMG-20260828-WA0003.jpg" alt="PhonePe Donation QR Code" style="display:block;width:min(320px,100%);height:auto;margin:0 auto;border-radius:8px;">
                </div>
                <button type="button" onclick="closeSiteModal('DONATION_MODAL_ID')" style="width:100%;padding:14px;background:#555;color:white;border:0;border-radius:6px;margin-top:15px;">Close</button>
            </div>`;
    }

    function createDonationModalIfMissing() {
        return createModal('donateModal', 'Scan & Donate', donationBodyHtml().replace('DONATION_MODAL_ID', 'donateModal'));
    }

    function updateExistingDonationModal(modalId) {
        var modal = document.getElementById(modalId);
        if (!modal) return;
        var panel = modal.firstElementChild;
        if (!panel) return;
        panel.innerHTML = '<h2 style="color:#7a2014;text-align:center;margin-top:0;">Scan &amp; Donate</h2>' + donationBodyHtml().replace('DONATION_MODAL_ID', modalId);
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

    window.toggleAttachmentFields = function (value) {
        var box = document.getElementById('attachmentsBox');
        var app = document.getElementById('appFormUpload');
        var aadhaar = document.getElementById('aadhaarUpload');
        if (!box) return;

        var showAttachments = value === 'Internship';
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

        updateExistingDonationModal('donateModal');
        updateExistingDonationModal('donationModal');

        var instances = [
            setupModal('registerModal', 'Register Loved Ones', 'Close registration form', 'register-modal-close'),
            setupModal('volunteerModal', 'Volunteer', 'Close volunteer form', 'volunteer-modal-close'),
            setupModal('donateModal', 'Scan & Donate', 'Close donation details', 'donation-modal-close'),
            setupModal('donationModal', 'Scan & Donate', 'Close donation details', 'donation-modal-close')
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