const ServiceRequest = require('../models/servicerequest');
const user = require('../models/user');
const vehicle = require('../models/vehicle');


exports.dashboard = async (req, res) => { 
    try {
        const mechanicId = req.session.user.id;

        const jobs = await ServiceRequest.find({
            status: 'pending',
            mechanic: null,
            rejectedBy: { $ne: mechanicId }
        }).populate('user').populate('vehicle')



        res.render('dashboard.ejs', {
            user: req.session.user,
            jobs
        });


    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load dashboard");
    }
};


exports.acceptJob = async (req, res) => {
    await ServiceRequest.findOneAndUpdate(
        { _id: req.params.id, status: 'pending' },
        {
            status: 'accepted',
            mechanic: req.session.user.id
        }
    );

    res.redirect('/dashboard');
};

exports.rejectJob = async (req, res) => {
    await ServiceRequest.findByIdAndUpdate(req.params.id, {
        $addToSet: { rejectedBy: req.session.user.id }
    });

    res.redirect('/dashboard');
};

exports.viewJob = async (req, res) => {
    try {
        const job = await ServiceRequest.findById(req.params.id)
            .populate('user')
            .populate('vehicle');

        if (!job) {
            return res.redirect('/dashboard');
        }

        // If already accepted by someone else, hide it
        if (job.status !== 'pending') {
            return res.redirect('/dashboard');
        }

        res.render('view.ejs', {
            user: req.session.user,
            job
        });

    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
};

exports.history = async (req, res) => {
    try {
        const mechanicId = req.session.user.id;

        const jobs = await ServiceRequest.find({
            mechanic: mechanicId,
            status: { $in: ['completed', 'cancelled'] }
        })
        .populate('user')
        .populate('vehicle')
        .sort({ createdAt: -1 });

        res.render('history.ejs', {
            user: req.session.user,
            jobs
        });

    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
};
