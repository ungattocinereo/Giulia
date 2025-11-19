/**
 * Validation utilities for contact forms
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate Russian phone number format
 * Accepts formats: +79XXXXXXXXX, 89XXXXXXXXX, 79XXXXXXXXX
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validatePhone(phone) {
    // Remove all spaces, dashes, and parentheses
    const cleaned = phone.replace(/[\s\-()]/g, '');

    // Check for valid Russian phone number formats
    const phoneRegex = /^(\+7|8|7)?9\d{9}$/;
    return phoneRegex.test(cleaned);
}

/**
 * Validate Telegram username format
 * @param {string} username - Telegram username to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateTelegram(username) {
    // Telegram usernames must start with @ and contain 5-32 alphanumeric characters or underscores
    const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/;
    return telegramRegex.test(username);
}

/**
 * Format phone number to standard format
 * @param {string} phone - Phone number to format
 * @returns {string} - Formatted phone number (+79XXXXXXXXX)
 */
export function formatPhone(phone) {
    const cleaned = phone.replace(/[\s\-()]/g, '');

    // Convert to +7 format
    if (cleaned.startsWith('8')) {
        return '+7' + cleaned.slice(1);
    } else if (cleaned.startsWith('7')) {
        return '+' + cleaned;
    } else if (cleaned.startsWith('+7')) {
        return cleaned;
    }

    return '+7' + cleaned;
}

/**
 * Ensure Telegram username has @ prefix
 * @param {string} username - Telegram username
 * @returns {string} - Username with @ prefix
 */
export function formatTelegram(username) {
    return username.startsWith('@') ? username : '@' + username;
}
