const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.userId });
  res.status(StatusCodes.OK).json({ jobs });
};
const getJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, createdBy: req.userId });
  if (!job) throw new NotFoundError(`No job found with id: ${req.params.id}`);
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    userId,
    params: { id: jobId },
  } = req;
  if (company.trim().length < 1 || position.trim().length < 1)
    throw new BadRequestError("Invalid Job details");
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
    }
  );
  if (!job) throw new NotFoundError(`No job found with id: ${req.params.id}`);
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    userId,
  } = req;
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job with id: ${req.params.id}`);
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
