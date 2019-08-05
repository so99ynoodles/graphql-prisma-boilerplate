# graphql-prisma-boilerplate
boilerplate for prisma graphql server for practice

create `.env-cmdrc` file

```
{
	"dev": {
		"PRISMA_ENDPOINT": "[]",
		"PRISMA_SECRET": "thisismysupersecretpassword",
		"JWT_SECRET": "myjwtsecret"
	},
	"stg": {
		"PRISMA_ENDPOINT": "[]",
		"PRISMA_SECRET": "thisismysupersecretpassword",
		"JWT_SECRET": "myjwtsecret"
	},
	"prod": {
		"PRISMA_ENDPOINT": "[]",
		"PRISMA_SECRET": "",
		"JWT_SECRET": "¥"
	}
}

```
