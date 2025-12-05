import Application from '../models/Application.js';

// POST /api/applications
export const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      jobLink,
      status,
      appliedDate,
      nextAction,
      nextActionDate,
      location,
      salaryRange,
      notes,
      category,
    } = req.body;

    const app = await Application.create({
      userId: req.user._id,
      company,
      role,
      jobLink,
      status,
      appliedDate,
      nextAction,
      nextActionDate,
      location,
      salaryRange,
      notes,
      category, // 👈 explicitly included
    });

    return res.status(201).json(app);
  } catch (err) {
    return res.status(500).json({ message: 'Error creating application' });
  }
};


// GET /api/applications
export const getApplications = async (req, res) => {
  const { status, search } = req.query;

  const query = { userId: req.user._id };

  if (status) query.status = status;
  if (search) {
    query.$or = [
      { company: new RegExp(search, 'i') },
      { role: new RegExp(search, 'i') },
    ];
  }

  try {
    const apps = await Application.find(query).sort({ createdAt: -1 });
    return res.json(apps);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching applications' });
  }
};

// GET /api/applications/:id
export const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!app) return res.status(404).json({ message: 'Application not found' });
    return res.json(app);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching application' });
  }
};

// PUT /api/applications/:id
export const updateApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      jobLink,
      status,
      appliedDate,
      nextAction,
      nextActionDate,
      location,
      salaryRange,
      notes,
      category,
    } = req.body;

    const app = await Application.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        company,
        role,
        jobLink,
        status,
        appliedDate,
        nextAction,
        nextActionDate,
        location,
        salaryRange,
        notes,
        category, // 👈 explicitly included
      },
      { new: true }
    );

    if (!app) return res.status(404).json({ message: 'Application not found' });
    return res.json(app);
  } catch (err) {
    return res.status(500).json({ message: 'Error updating application' });
  }
};


// delete an application
export const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await app.deleteOne();
    res.status(200).json({ message: 'Application deleted' });
  } catch (err) {
    console.error('Error deleting application', err);
    res.status(500).json({ message: 'Server error' });
  }
};

