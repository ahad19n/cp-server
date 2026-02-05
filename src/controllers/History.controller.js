const History = require('../models/History.model');

// -------------------------------------------------------------------------- //

exports.getUserHistory = async (req, res) => {
  try {
    const { 
      dateFrom, 
      dateTo, 
      sortBy = 'timestamp', 
      sortOrder = 'desc',
      printSize,
      minAmount,
      maxAmount,
      limit,
      page = 1
    } = req.query;

    let filter = {};

    if (dateFrom || dateTo) {
      filter.timestamp = {};
      if (dateFrom) {
        filter.timestamp.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999); // Include entire day
        filter.timestamp.$lte = endDate;
      }
    }

    // Print size filter
    if (printSize) {
      filter.printSize = printSize;
    }

    // Amount range filter
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = Number(minAmount);
      if (maxAmount) filter.amount.$lte = Number(maxAmount);
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const pageSize = limit ? parseInt(limit) : 100;
    const skip = (parseInt(page) - 1) * pageSize;

    // Execute query
    const transactions = await Transaction.find(filter)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(skip)
      .lean();

    // Get total count
    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / pageSize),
      data: transactions,
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message,
    });
  }
};
