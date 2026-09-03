from pathlib import Path

path = Path('marathi.html')
text = path.read_text(encoding='utf-8')

def extract_div(text, marker):
    start = text.find(marker)
    if start < 0:
        raise SystemExit(f'Could not find {marker}')
    pos = start
    depth = 0
    while True:
        open_pos = text.find('<div', pos)
        close_pos = text.find('</div>', pos)
        if close_pos < 0:
            raise SystemExit(f'Unbalanced div structure after {marker}')
        if open_pos >= 0 and open_pos < close_pos:
            depth += 1
            pos = open_pos + 4
        else:
            depth -= 1
            pos = close_pos + len('</div>')
            if depth == 0:
                return start, pos

volunteer_modal = '''<!-- SECOND POP-UP MODAL: VOLUNTEER SIGN-UP FORM -->
<div id="volunteerModal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);align-items:center;justify-content:center;padding:20px;box-sizing:border-box;">
    <div style="background:white;padding:30px;border-radius:10px;width:90%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative;box-sizing:border-box;">
        <span onclick="document.getElementById('volunteerModal').style.display='none'" style="position:absolute;right:15px;top:10px;font-size:28px;font-weight:bold;color:#777;cursor:pointer;line-height:1;">&times;</span>
        <h3 style="margin:0 30px 18px 0;color:#7a2014;text-align:center;font-size:1.4rem;border-bottom:2px solid #FF9933;padding-bottom:8px;">स्वयंसेवक व्हा</h3>
        <form action="https://formspree.io" method="POST" enctype="multipart/form-data">
            <div style="display:grid;grid-template-columns:3fr 1fr;gap:12px;margin-bottom:12px;">
                <div>
                    <label><strong>नाव</strong></label>
                    <input type="text" name="full_name" required style="width:100%;padding:12px;margin:8px 0 0;box-sizing:border-box;">
                </div>
                <div>
                    <label><strong>वय</strong></label>
                    <input type="number" name="age" required style="width:100%;padding:12px;margin:8px 0 0;box-sizing:border-box;">
                </div>
            </div>
            <label><strong>मोबाईल क्रमांक</strong></label>
            <input type="tel" name="mobile" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
            <label><strong>ई-मेल</strong></label>
            <input type="email" name="email" style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
            <label><strong>पत्ता</strong></label>
            <textarea name="address" rows="3" style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;"></textarea>
            <label><strong>आपण आश्रमासाठी कशाप्रकारे स्वयंसेवा करू इच्छिता?</strong></label>
            <textarea name="message" rows="4" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;"></textarea>
            <button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;cursor:pointer;">स्वयंसेवक अर्ज पाठवा</button>
            <button type="button" onclick="document.getElementById('volunteerModal').style.display='none'" style="width:100%;padding:12px;background:#555;color:white;border:0;border-radius:6px;margin-top:10px;cursor:pointer;">बंद करा</button>
        </form>
    </div>
</div>'''

register_modal = '''<!-- Registration Modal -->
<div id="registerModal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);align-items:center;justify-content:center;padding:20px;box-sizing:border-box;">
    <div style="background:white;padding:30px;border-radius:10px;width:90%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative;box-sizing:border-box;">
        <span onclick="document.getElementById('registerModal').style.display='none'" style="position:absolute;right:15px;top:10px;font-size:28px;font-weight:bold;color:#777;cursor:pointer;line-height:1;">&times;</span>
        <h3 style="margin:0 30px 18px 0;color:#7a2014;text-align:center;font-size:1.4rem;border-bottom:2px solid #FF9933;padding-bottom:8px;">आपल्या प्रिय व्यक्तीची नोंदणी करा</h3>
        <form action="https://formspree.io/f/mbdbkepd" method="POST">
            <label><strong>ज्येष्ठ नागरिकाचे नाव</strong></label>
            <input type="text" name="resident_name" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <div>
                    <label><strong>वय</strong></label>
                    <input type="number" name="age" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
                </div>
                <div>
                    <label><strong>लिंग</strong></label>
                    <select name="gender" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
                        <option value="">निवडा</option>
                        <option value="male">पुरुष</option>
                        <option value="female">महिला</option>
                        <option value="other">इतर</option>
                    </select>
                </div>
            </div>
            <label><strong>आपले नाव</strong></label>
            <input type="text" name="contact_name" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
            <label><strong>मोबाईल क्रमांक</strong></label>
            <input type="tel" name="mobile" required style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
            <label><strong>ई-मेल</strong></label>
            <input type="email" name="email" style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;">
            <label><strong>पत्ता</strong></label>
            <textarea name="address" rows="3" style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;"></textarea>
            <label><strong>अतिरिक्त माहिती</strong></label>
            <textarea name="message" rows="4" style="width:100%;padding:12px;margin:8px 0 12px;box-sizing:border-box;"></textarea>
            <button type="submit" style="width:100%;padding:14px;background:#FF9933;color:white;border:0;border-radius:6px;font-weight:bold;cursor:pointer;">नोंदणी अर्ज पाठवा</button>
            <button type="button" onclick="document.getElementById('registerModal').style.display='none'" style="width:100%;padding:12px;background:#555;color:white;border:0;border-radius:6px;margin-top:10px;cursor:pointer;">बंद करा</button>
        </form>
    </div>
</div>'''

for marker in ('<div id="volunteerModal"', '<div id="registerModal"'):
    while marker in text:
        start, end = extract_div(text, marker)
        comment_start = text.rfind('<!--', 0, start)
        comment_end = text.find('-->', comment_start, start)
        if comment_start >= 0 and comment_end >= 0 and start - comment_end <= 80:
            start = comment_start
        text = text[:start] + text[end:]

anchor = text.find('</body>')
if anchor < 0:
    raise SystemExit('Could not find </body> in marathi.html')
text = text[:anchor] + '\n\n' + register_modal + '\n\n' + volunteer_modal + '\n\n' + text[anchor:]

if text.count('<div id="volunteerModal"') != 1:
    raise SystemExit('marathi.html must contain exactly one volunteerModal')
if text.count('<div id="registerModal"') != 1:
    raise SystemExit('marathi.html must contain exactly one registerModal')

path.write_text(text, encoding='utf-8')
print('Marathi modal repair completed successfully.')
