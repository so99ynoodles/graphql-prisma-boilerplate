import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import encryptPassword from '../utils/encryptPassword';

const Mutation = {
	async login(parent, args, {prisma}, info) {
		const user = await prisma.query.user({
			where: {
				email: args.data.email,
			},
		});

		if (!user) {
			throw new Error('Unable to login');
		}

		const isMatch = await bcrypt.compare(args.data.password, user.password);

		if (!isMatch) {
			throw new Error('Unable to login');
		}

		return {
			user,
			token: generateToken(user.id),
		};
	},
	async createUser(parent, args, {prisma}, info) {
		const password = await encryptPassword(args.data.password);

		const emailTaken = await prisma.exists.User({email: args.data.email});

		if (emailTaken) {
			throw new Error('Email is already exists');
		}

		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password,
			},
		});

		return {
			user,
			token: generateToken(user.id),
		};
	},
	async deleteUser(parent, args, {prisma, req}, info) {
		const userId = getUserId(req);
		return prisma.mutation.deleteUser({where: {id: userId}}, info);
	},
	async updateUser(parent, args, {prisma, req}, info) {
		const userId = getUserId(req);

		if (typeof args.data.password === 'string') {
			args.data.password = await encryptPassword(args.data.password);
		}

		return prisma.mutation.updateUser(
			{where: {id: userId}, data: args.data},
			info,
		);
	},
};

export {Mutation as default};
