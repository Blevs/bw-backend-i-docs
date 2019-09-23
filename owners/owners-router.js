const router = require('express').Router();
const Owners = require('./owners-model.js');
const Pets = require('../pets/pets-model.js');



router.get('/', (req, res) => {
  Owners.get()
    .then(owners => {
      res.status(200).json(owners);
    });
});


/**
 * @api {post} /owners/ Add Owner
 * @apiName AddOwner
 * @apiGroup Owners
 *
 * @apiParam {String} name Owner name, not unique
 * @apiParam {String} email Owner email, must be unique
 * 
 * @apiParamExample Example Body:
 * {
 *   "name": "Freddie Mercury",
 *   "email": "example@example.corm"
 * }
 * 
 * @apiSuccess {Number} id Owner id
 * @apiSuccess {String} name Owner Name
 * @apiSuccess {String} email Owner email
 * @apiSuccess {Objects[]} pets Array of pets objects belonging to owner
 *
 * @apiSuccessExample Success
 * {
 *   "id": 4,
 *   "name": "Freddie Mercury",
 *   "email": "example@example.corm",
 *   "pets": []
 * }
 */

router.post('/', (req, res) => {
  const { name, email } = req.body;
  Owners.insert({ name, email })
    .then(owner => res.status(200).json(owner));
});

/**
 * @api {get} /owners/:id Get Owner
 * @apiName GetOwner
 * @apiGroup Owners
 *
 * @apiParam {Number} id Owner id
 * 
 * @apiSuccess {Number} id Owner id
 * @apiSuccess {String} name Owner Name
 * @apiSuccess {String} email Owner email
 * @apiSuccess {Objects[]} pets Array of pets objects belonging to owner
 * 
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 * {
 *   "id": 2,
 *   "name": "Colonel Mustard",
 *   "email": "leadpipe@diningroom.com",
 *   "pets": [
 *     {
 *       "id": 4,
 *       "name": "Rupert",
 *       "owner_id": 2,
 *       "care_instructions": null,
 *       "specie": "Dog",
 *       "owner_name": "Colonel Mustard",
 *       "owner_email": "leadpipe@diningroom.com"
 *     },
 *     {
 *       "id": 5,
 *       "name": "Slingshot",
 *       "owner_id": 2,
 *       "care_instructions": null,
 *       "specie": "Dog",
 *       "owner_name": "Colonel Mustard",
 *       "owner_email": "leadpipe@diningroom.com"
 *     }
 *   ]
 * }
 * 
 * @apiError OwnerNotFound The id of the Owner was not found.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   error: "Owner with id not found."
 * }
 *
 */

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Owners.getById(id)
    .then(owner => {
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).end();
      }
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  Owners.update(id, { name, email })
    .then(owner => {
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).end();
      }
    });
});

router.get('/:id/pets', (req, res) => {
  const { id } = req.params;
  Pets.getByOwnerId(id)
    .then(pets => {
      res.status(200).json(pets);
    });
});

router.post('/:owner_id/pets', (req, res) => {
  const { owner_id } = req.params;
  const { name, care_instructions, species_id, age } = req.body;
  Pets.insert({ name, care_instructions, species_id, age, owner_id: parseInt(owner_id, 10) })
    .then(pets => {
      res.status(200).json(pets);
    });
});

module.exports = router;
