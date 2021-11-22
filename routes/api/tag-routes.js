const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const allTags = await Tag.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(allTags);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const singleTag = await Tag.findOne({
			where: { id: req.params.id },
			include: [{ model: Product }],
		});
		if (!singleTag) {
			res.status(404).json({ message: "ERROR   NO TAG WITH THAT ID" });
			return;
		}
		res.status(200).json(singleTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	// create a new tag
	Tag.create({
		tag_name: req.body.tag_name,
	})
		.then((newTag) => {
			res.json(newTag);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	Tag.update(req.body, {
		where: { id: req.params.id },
	})
		.then((updateTag) => {
			if (!updateTag) {
				res.status(404).json({
					message: "ERROR   NO TAG WITH THAT ID",
				});
				return;
			}
			res.json(updateTag);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", async (req, res) => {
	Tag.destroy({
		where: { id: req.params.id },
	})
		.then((deleteTag) => {
			if (!deleteTag) {
				res.status(404).json({
					message: "ERROR   NO TAG WITH THAT ID",
				});
				return;
			}
			res.json(deleteTag);
		})
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
