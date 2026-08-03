/* Bitrix24 lead integration ported verbatim from the original js2.html. */
import {
  BITRIX24_WEBHOOK_URL,
  UF_EXAM_TYPE,
  UF_EXAM_SCORE,
} from '@/data/questions';

let bitrixLeadId: number | null = null;

export function createBitrixLead(
  name: string,
  phone: string,
  email: string,
  examType: string,
  examDate: string,
  onSuccess?: (id: number) => void,
): void {
  void examDate;
  if (BITRIX24_WEBHOOK_URL.indexOf('YOUR_') !== -1) return;
  try {
    const fn = name.split(' ')[0];
    const ln = name.split(' ').slice(1).join(' ');
    const fields: Record<string, unknown> = {
      TITLE: 'TEAM Exam - ' + name + ' (' + examType + ')',
      NAME: fn,
      LAST_NAME: ln,
      PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
      SOURCE_ID: '18',
      SOURCE_DESCRIPTION: 'https://teamuni.uz/online-exams',
    };
    if (email) fields.EMAIL = [{ VALUE: email, VALUE_TYPE: 'WORK' }];
    const payload = { fields: fields, params: { REGISTER_SONET_EVENT: 'Y' } };
    fetch(BITRIX24_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.error) console.error('Bitrix error:', d.error);
        else if (d.result) {
          bitrixLeadId = d.result;
          if (onSuccess) onSuccess(d.result);
        }
      })
      .catch(function (e) { console.error('Bitrix network error:', e); });
  } catch (e) { console.error('Bitrix exception:', e); }
}

export function updateBitrixLeadWithResults(
  scoreStr: string,
  totalStr: string,
  sectionBreakdown: string,
  examType: string,
  writingText: string,
): void {
  void totalStr;
  if (!bitrixLeadId || BITRIX24_WEBHOOK_URL.indexOf('YOUR_') !== -1) return;
  try {
    const updateUrl = BITRIX24_WEBHOOK_URL.replace('crm.lead.add', 'crm.lead.update');
    let resultText =
      'Exam: ' + examType + '\nAuto-graded Score: ' + scoreStr + '\n\nSection Breakdown:\n' + sectionBreakdown;
    if (writingText) resultText += '\n' + writingText;
    const fields: Record<string, unknown> = { COMMENTS: resultText };
    fields[UF_EXAM_TYPE] = examType;
    fields[UF_EXAM_SCORE] = scoreStr;
    // fields[UF_EXAM_TOTAL] = totalStr;
    // fields[UF_EXAM_SECTIONS] = sectionBreakdown;
    const payload = { id: bitrixLeadId, fields: fields, params: { REGISTER_SONET_EVENT: 'Y' } };
    fetch(updateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d.error) console.error('Bitrix update error:', d.error); })
      .catch(function (e) { console.error('Bitrix update network error:', e); });
  } catch (e) { console.error('Bitrix update exception:', e); }
}
