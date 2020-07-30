function set_custom_buttons(frm) {
	const custom_buttons = [
		{
			label: __('Book Appointment'),
			onclick: () => _create_patient_booking(frm),
		},
	];
	custom_buttons.forEach(function(custom_button) {
		frm.add_custom_button(custom_button['label'], custom_button['onclick']);
	});
}


function _create_patient_booking(frm) {
    if (!frm.__skip_calendar) {
        frappe.set_route(
            'List',
            'Patient Booking',
            'Calendar',
            {
                customer: frm.doc.default_owner,
                patient: frm.doc.animal,
            }
        );
    } else {
        frappe.model.with_doctype('Patient Booking', function() {
            const doc = frappe.model.get_new_doc('Patient Booking');
            doc.customer = frm.doc.default_owner;
            doc.patient = frm.doc.animal;
            frappe.set_route('Form', 'Patient Booking', doc.name);
        });
    }
}
