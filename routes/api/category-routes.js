const router = require("express").Router();
const { Category, Product } = require("../../models");
router.get("/", async (req, res) => {
	try {
		const allCategories = await Category.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(allCategories);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.get("/:id", async (req, res) => {
	try {
		const singleCategory = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!singleCategory) {
			res.status(404).json({
				message: "ERROR   NO CATEGORY WITH THAT ID",
			});
			return;
		}
		res.status(200).json(singleCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});
router.put("/:id", async (req, res) => {
	Category.update(req.body, {
		where: { id: req.params.id },
	})
		.then((updateCategory) => {
			if (!updateCategory) {
				res.status(404).json({
					message: "ERROR   NO CATEGORY WITH THAT ID",
				});
				return;
			}
			res.json("Category Updated");
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
router.post("/", async (req, res) => {
	Category.create({
		category_name: req.body.category_name,
	})
		.then((newCategory) => {
			res.json("Category Created");
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
router.delete("/:id", async (req, res) => {
	try {
		const deleteCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!deleteCategory) {
			res.status(404).json({
				message: "ERROR   NO CATEGORY WITH THAT ID",
			});
			return;
		}
		res.status(200).json("Category Deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
