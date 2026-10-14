import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import styles from './BarberLayout.module.css';

export default function BarberLayout() {
  const { name, logout } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  async function handleLogout() {
    setLogoutOpen(false);
    await logout();
  }

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.brand}>
            <span className={styles.mark} aria-hidden="true" />
            FLOWCUT
          </span>

          <div className={styles.who}>
            <span className={styles.avatar} aria-hidden="true">{name?.charAt(0)?.toUpperCase() || 'B'}</span>
            <span className={styles.name}>{name || 'Barber'}</span>

            <button
              className={styles.logout}
              type="button"
              onClick={() => setLogoutOpen(true)}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      {/* LOG OUT MODAL */}
      <Modal
        skin="logout"
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log out of FlowCut?"
      >
        <p className={styles.logoutCopy}>You’ll need to sign in again to access your account.</p>

        <div className={styles.logoutActions}>
          <Button
            skin="clean"
            variant="logoutCancel"
            onClick={() => setLogoutOpen(false)}
          >
            Cancel
          </Button>

          <Button
            skin="clean"
            variant="shopAdminPrimary"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </Modal>
    </div>
  );
}
