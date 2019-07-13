const Sticker = require('../../model/Sticker');
const {body, validationResult} = require('express-validator');


function isValid(sticker) {
    const hasTitle = typeof sticker.title == 'string' && sticker.title.trim() != '';
    const hasUrl = typeof sticker.url == 'string' && sticker.url.trim() != '';
    return hasTitle && hasUrl;
}

exports.validate = (method) => {
    switch (method) {
        case 'create': {
            return [
                body('title', 'title required').exists(),
                body('description', 'description required').exists(),
                body('rating', 'rating required').exists(),
                body('url', 'url required').exists(),
            ]
        }
        default: {
            return [];
        }
    }
};

exports.getAll = (req, res) => {

    Sticker.getAll().then((stickers) => {
        res.json(stickers);
    });

};

exports.show = (req, res) => {
    Sticker.getOne(req.params.id).then((sticker) => {
        res.json(sticker);
    });
};

exports.store = async (req, res, next) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
            return;
        }

        await Sticker.create(req.body).then(sticker => {
            res.json(sticker);
        });
    } catch (err) {
        return next(err)
    }
};

exports.update = (req, res, next) => {
    if (isValid(req.body)) {
        Sticker.update(req.params.id, req.body).then(sticker => {
            res.json(sticker);
        });
    } else {
        next(new Error('Invalid sticker'));
    }
};

exports.destroy = (req, res) => {
    Sticker.delete(req.params.id).then(() => {
        res.json({
            'deleted': true
        });
    });
};