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
		const { systemName, email, username, password, loginUrl } = body;

		// Validate required fields
		if (!systemName || !email || !username || !password || !loginUrl) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Configure email options
		const mailOptions = {
			from: EMAIL_USER,
			to: email,
			subject: `Folify - Your System "${systemName}" Has Been Created`,
			html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
				</head>
				<body style="margin: 0; padding: 0; background-color: #eff6ff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
					<table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #eff6ff; padding: 40px 20px;">
						<tr>
							<td align="center">
								<table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
									<!-- Header -->
									<tr>
										<td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #10b981 100%); padding: 40px 30px; text-align: center;">
											<h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
												Welcome to Folify
											</h1>
											<p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 14px; font-weight: 400;">
												Your system has been successfully created
											</p>
										</td>
									</tr>

									<!-- System Info Section -->
									<tr>
										<td style="padding: 35px 30px 20px 30px;">
											<h2 style="color: #1d4ed8; margin: 0 0 20px 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #bfdbfe; padding-bottom: 10px;">
												System Details
											</h2>
											<table role="presentation" style="width: 100%; border-collapse: collapse;">
												<tr>
													<td style="padding: 12px 0; border-bottom: 1px solid #eff6ff;">
														<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 140px;">System Name:</span>
														<span style="color: #1e3a5f; font-size: 14px;">${systemName}</span>
													</td>
												</tr>
											</table>
										</td>
									</tr>

									<!-- Credentials Section -->
									<tr>
										<td style="padding: 20px 30px 20px 30px;">
											<h2 style="color: #1d4ed8; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #bfdbfe; padding-bottom: 10px;">
												Your Login Credentials
											</h2>
											<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 4px;">
												<table role="presentation" style="width: 100%; border-collapse: collapse;">
													<tr>
														<td style="padding: 8px 0;">
															<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 140px;">Email:</span>
															<span style="color: #1e3a5f; font-size: 14px;">${email}</span>
														</td>
													</tr>
													<tr>
														<td style="padding: 8px 0;">
															<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 140px;">Username:</span>
															<span style="color: #1e3a5f; font-size: 14px;">${username}</span>
														</td>
													</tr>
													<tr>
														<td style="padding: 8px 0;">
															<span style="color: #1e40af; font-weight: 600; font-size: 14px; display: inline-block; width: 140px;">Password:</span>
															<span style="color: #1e3a5f; font-size: 14px; font-family: monospace; background-color: #dbeafe; padding: 2px 8px; border-radius: 4px;">${password}</span>
														</td>
													</tr>
												</table>
											</div>
											<p style="color: #dc2626; font-size: 13px; margin: 15px 0 0 0; font-weight: 500;">
												⚠️ Please change your password after your first login for security purposes.
											</p>
										</td>
									</tr>

									<!-- Login Link Section -->
									<tr>
										<td style="padding: 10px 30px 35px 30px; text-align: center;">
											<a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
												Login to Your System
											</a>
										</td>
									</tr>

									<!-- Footer -->
									<tr>
										<td style="background-color: #eff6ff; padding: 25px 30px; text-align: center; border-top: 3px solid #2563eb;">
											<p style="color: #1d4ed8; font-size: 12px; margin: 0; line-height: 1.5;">
												This email was sent by <strong>Folify</strong> upon successful system registration.
											</p>
											<p style="color: #93c5fd; font-size: 11px; margin: 8px 0 0 0;">
												If you did not request this, please ignore this email.
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
				WELCOME TO FOLIFY
				Your system has been successfully created
				================================================================================

				SYSTEM DETAILS
				System Name: ${systemName}

				YOUR LOGIN CREDENTIALS
				Email:    ${email}
				Username: ${username}
				Password: ${password}

				⚠️ Please change your password after your first login for security purposes.

				Login here: ${loginUrl}

				--------------------------------------------------------------------------------
				This email was sent by Folify upon successful system registration.
				If you did not request this, please ignore this email.
			`,
		};

		// Send email using Nodemailer
		const info = await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ success: true, message: 'Credentials email sent successfully', messageId: info.messageId },
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
