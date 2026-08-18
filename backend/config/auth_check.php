<?php
// Include this in any API endpoint that requires an authenticated admin session.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function require_admin_session(): void
{
    if (empty($_SESSION['admin_id'])) {
        respond_error('Unauthorized. Please log in.', 401);
    }
}
