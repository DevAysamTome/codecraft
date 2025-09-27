import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';
import { authOptions } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const requests = await ServiceRequest.find(query)
      .populate('serviceId', 'title slug')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await ServiceRequest.countDocuments(query);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const serviceRequest = new ServiceRequest(body);
    await serviceRequest.save();

    // Send confirmation email to user
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: serviceRequest.email,
      subject: 'Service Request Received - Code Craft Technology',
      html: `
        <h2>Thank you for your service request!</h2>
        <p>Dear ${serviceRequest.name},</p>
        <p>We have received your service request and will get back to you within 24 hours.</p>
        <p><strong>Request Details:</strong></p>
        <ul>
          <li>Name: ${serviceRequest.name}</li>
          <li>Email: ${serviceRequest.email}</li>
          <li>Phone: ${serviceRequest.phone}</li>
          <li>Company: ${serviceRequest.company || 'N/A'}</li>
          <li>Budget Range: ${serviceRequest.budgetRange || 'N/A'}</li>
          <li>Deadline: ${serviceRequest.deadline || 'N/A'}</li>
        </ul>
        <p>We will review your request and contact you soon.</p>
        <p>Best regards,<br>Code Craft Technology Team</p>
      `,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: 'New Service Request Received',
      html: `
        <h2>New Service Request</h2>
        <p>A new service request has been submitted:</p>
        <ul>
          <li>Name: ${serviceRequest.name}</li>
          <li>Email: ${serviceRequest.email}</li>
          <li>Phone: ${serviceRequest.phone}</li>
          <li>Company: ${serviceRequest.company || 'N/A'}</li>
          <li>Message: ${serviceRequest.message}</li>
          <li>Budget Range: ${serviceRequest.budgetRange || 'N/A'}</li>
          <li>Deadline: ${serviceRequest.deadline || 'N/A'}</li>
        </ul>
      `,
    });

    return NextResponse.json(serviceRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json(
      { error: 'Failed to create service request' },
      { status: 500 }
    );
  }
}
