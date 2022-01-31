// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
	try {
		const { username, password } = req.body;
		if (username === 'testuser' && password === '1234123') {
			res.status(200).json({
				userId: '0000001',
				fName: 'Test',
				lName: 'User',
				email: 'test@test.com',
				role: 'user',
			});
		} else {
			res.status(400).send('User not found');
		}
	} catch (error) {
		res.status(500).send('Internal Service Error');
	}
}
