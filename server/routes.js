const express = require("express")
const Avatar = require("./models/Avatar") // new
const router = express.Router()

router.post("/avatars", async (req, res) => {
	const avatar = new Avatar({
		feature1: req.body.f1,
		feature2: req.body.f2,
        feature3: req.body.f3
	})
	await avatar.save()
	res.send({
		"status": "success"
	})
})

router.get("/avatars", async (req, res) => {
	const avatars = await Avatar.find()
	res.send(avatars)
})

router.get("/avatars/:id", async (req, res) => {
	const avatar = await Avatar.findOne({ _id: req.params.id })
	res.send(avatar)
})

router.get("/avatars/:id", async (req, res) => {
	try {
		const avatar = await Avatar.findOne({ _id: req.params.id })
		res.send(avatar)
	} catch {
		res.status(404)
		res.send({ error: "Avatar doesn't exist!" })
	}
})

router.patch("/avatars/:id", async (req, res) => {
	try {
		const avatar = await Avatar.findOne({ _id: req.params.id })

		if (req.body.f1) {
			avatar.feature1 = req.body.f1
		}
		if (req.body.f2) {
			avatar.feature2 = req.body.f2
		}
		if (req.body.f3) {
			avatar.feature3 = req.body.f3
		}
		await avatar.save()
		res.send(avatar)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = router