<?php
require_once __DIR__ . '/includes/auth.php';
admin_require_login();
require_once __DIR__ . '/includes/db.php';

$db = get_db();

if (isset($_GET['delete'])) {
    $id = (int) $_GET['delete'];
    $stmt = $db->prepare('DELETE FROM contact_messages WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    header('Location: messages.php?deleted=1');
    exit;
}

$messages = $db->query('SELECT * FROM contact_messages ORDER BY created_at DESC');

$activePage = 'messages';
require __DIR__ . '/includes/header.php';
?>
<h1>Contact Messages</h1>
<?php if (isset($_GET['deleted'])): ?><div class="success-box">Message deleted.</div><?php endif; ?>

<div class="card">
  <table>
    <thead><tr><th>Name</th><th>Contact</th><th>Course Interest</th><th>Message</th><th>Received</th><th></th></tr></thead>
    <tbody>
      <?php if ($messages->num_rows === 0): ?>
        <tr><td colspan="6" class="empty-state">No messages yet.</td></tr>
      <?php else: while ($m = $messages->fetch_assoc()): ?>
        <tr>
          <td><?= e($m['name']) ?></td>
          <td><?= e($m['phone']) ?><br><small style="color:#9ca3af"><?= e($m['email']) ?></small></td>
          <td><?= e($m['course_interest']) ?></td>
          <td style="max-width:280px"><?= e($m['message']) ?></td>
          <td><?= e($m['created_at']) ?></td>
          <td><a class="btn btn-sm btn-danger" href="messages.php?delete=<?= (int)$m['id'] ?>" onclick="return confirm('Delete this message?')">Delete</a></td>
        </tr>
      <?php endwhile; endif; ?>
    </tbody>
  </table>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
