import { setAdminPasswordHash } from '$lib/db.js';
import { hashSync } from 'bcryptjs';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const current = data.get('current')?.toString() ?? '';
		const newPwd = data.get('new')?.toString() ?? '';
		const confirm = data.get('confirm')?.toString() ?? '';

		if (!current || !newPwd || !confirm) {
			return fail(400, { error: 'Všetky polia sú povinné.' });
		}
		if (newPwd.length < 6) {
			return fail(400, { error: 'Nové heslo musí mať aspoň 6 znakov.' });
		}
		if (newPwd !== confirm) {
			return fail(400, { error: 'Heslá sa nezhodujú.' });
		}

		const { compareSync } = await import('bcryptjs');
		const { getAdminPasswordHash } = await import('$lib/db.js');
		const hash = getAdminPasswordHash();
		if (!compareSync(current, hash)) {
			return fail(400, { error: 'Aktuálne heslo je nesprávne.' });
		}

		setAdminPasswordHash(hashSync(newPwd, 10));
		return { success: 'Heslo bolo zmenené.' };
	}
};
