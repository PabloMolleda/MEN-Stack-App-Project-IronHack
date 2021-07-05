const router = required("express").Router()

// new agreement

router.get('/create', (req, res) => res.render('places/new-place'))

router.post('/create', (req, res) => {

  const { name, type, street, lng } = req.body

  const address = {
    street
}

  Place
    .create({ name, type, address })
    .then(() => res.redirect('/places/list'))
    .catch(err => console.log('An has ocurred when adding a new place', err))
})

// agreements list

router.get('/list', (req, res) => {

    Place
      .find()
      .select('name')
      .then(places => res.render('places/places-list', { places }))
      .catch(err => console.log(err))
  })

// see agreement details

  router.get('/details/:place_id', (req, res) => {

    const { place_id } = req.params

    Place
        .findById(place_id)
        .then(team => res.render('places/places-details', team))
        .catch(err => console.log('An has ocurred when showing a place details', err))
})

// delete agreement


router.get('/details/:place_id/delete', (req, res) => res.render('places/places-list'))

router.post('/details/:place_id/delete', (req, res) => {

    const { place_id } = req.params

    Place
        .findByIdAndRemove(place_id)
        .then(() => res.redirect('/places/list'))
        .catch(err => console.log('An has ocurred when deleting a place', err))
})


// edit agreement

module.exports = router