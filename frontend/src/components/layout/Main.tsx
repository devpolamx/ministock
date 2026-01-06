// src/components/layout/Main.tsx

import type { ReactNode } from 'react';
import '../../styles/dashboard.scss';

interface MainProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const Main = ({ children, title, subtitle }: MainProps) => {
  return (
    <main
      className="flex-grow-1 p-4 main-content"
    >
      <div className="container-fluid">
        {(title || subtitle) && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {title && <h1 className="h3 mb-1">{title}</h1>}
                    {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <div className="shadow-sm rounded border p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;