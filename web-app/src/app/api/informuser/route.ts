import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_USER = "muktadulislam.folify@gmail.com"
// Use an App Password (not your regular Gmail password)
// Generate one at: https://myaccount.google.com/apppasswords
const EMAIL_PASSWORD = "sqyi bufr mhjs wjvz"

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { firstName, lastName, email, phone, message } = body;
		console.log(firstName, lastName, email, phone, message)

		// Validate required fields
		if (!firstName || !lastName || !email || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Configure email options
		const mailOptions = {
			from: EMAIL_USER,
			to: 'muktadul.iitdu@gmail.com',
			replyTo: email,
			subject: `Folify - অ্যাপ তৈরির রিকোয়েস্ট - ${firstName} ${lastName}`,
			html: `
				<!DOCTYPE html>
				<html lang="bn">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
				</head>
				<body style="margin: 0; padding: 0; background-color: #eff6ff; font-family: 'Hind Siliguri', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
					<table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #eff6ff; padding: 40px 20px;">
						<tr>
							<td align="center">
								<table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
									<!-- Header -->
									<tr>
										<td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #10b981 100%); padding: 40px 30px; text-align: center;">
											<h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
												Folify - নতুন অ্যাপ তৈরির রিকোয়েস্ট
											</h1>
											<p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 14px; font-weight: 400;">
												${new Date().toLocaleDateString('bn-BD', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
											</p>
										</td>
									</tr>

									<!-- Contact Information Section -->
									<tr>
										<td style="padding: 35px 30px 20px 30px;">
											<h2 style="color: #1d4ed8; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #bfdbfe; padding-bottom: 10px;">
												যোগাযোগের তথ্য
											</h2>
											<table role="presentation" style="width: 100%; border-collapse: collapse;">
												<tr>
													<td style="padding: 12px 0; border-bottom: 1px solid #eff6ff;">
														<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 120px;">সম্পূর্ণ নাম:</span>
														<span style="color: #1e3a5f; font-size: 14px;">${firstName} ${lastName}</span>
													</td>
												</tr>
												<tr>
													<td style="padding: 12px 0; border-bottom: 1px solid #eff6ff;">
														<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 120px;">ইমেইল:</span>
														<a href="mailto:${email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${email}</a>
													</td>
												</tr>
												<tr>
													<td style="padding: 12px 0;">
														<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 120px;">ফোন:</span>
														<span style="color: #1e3a5f; font-size: 14px;">${phone || 'দেওয়া হয়নি'}</span>
													</td>
												</tr>
											</table>
										</td>
									</tr>

									<!-- Message Section -->
									<tr>
										<td style="padding: 20px 30px 35px 30px;">
											<h2 style="color: #1d4ed8; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #bfdbfe; padding-bottom: 10px;">
												বার্তার বিষয়বস্তু
											</h2>
											<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 4px;">
												<p style="color: #1e3a5f; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
											</div>
										</td>
									</tr>

									<!-- Footer -->
									<tr>
										<td style="background-color: #eff6ff; padding: 25px 30px; text-align: center; border-top: 3px solid #2563eb;">
											<p style="color: #1d4ed8; font-size: 12px; margin: 0; line-height: 1.5;">
												এই বার্তাটি <strong>Folify</strong> ওয়েবসাইটের অ্যাপ তৈরির রিকোয়েস্ট ফর্ম থেকে পাঠানো হয়েছে
											</p>
											<p style="color: #93c5fd; font-size: 11px; margin: 8px 0 0 0;">
												অনুগ্রহ করে যত তাড়াতাড়ি সম্ভব উত্তর দিন।
											</p>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</body>
				</html>
			`,
			text: `
				FOLIFY - নতুন অ্যাপ তৈরির রিকোয়েস্ট
				${new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

				================================================================================
				যোগাযোগের তথ্য
				================================================================================

				সম্পূর্ণ নাম:    ${firstName} ${lastName}
				ইমেইল:          ${email}
				ফোন:            ${phone || 'দেওয়া হয়নি'}

				================================================================================
				বার্তার বিষয়বস্তু
				================================================================================

				${message}

				--------------------------------------------------------------------------------
				এই বার্তাটি Folify ওয়েবসাইটের অ্যাপ তৈরির রিকোয়েস্ট ফর্ম থেকে পাঠানো হয়েছে
			`,
		};

		// Send email using Nodemailer
		const info = await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ success: true, message: 'Email sent successfully', messageId: info.messageId },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Server error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
