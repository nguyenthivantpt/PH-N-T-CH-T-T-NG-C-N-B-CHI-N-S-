
import React from 'react';
import IdeologyAnalyzer from './components/IdeologyAnalyzer';

function App() {
  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 antialiased">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-sky-700 dark:text-sky-400">
            Hệ thống Trợ lý Ảo
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Phân tích và Đánh giá Công tác Tư tưởng
          </p>
        </header>
        <IdeologyAnalyzer />
        <footer className="text-center mt-12 text-sm text-slate-500 dark:text-slate-500">
          <p>Phát triển bởi Cục Công nghệ Thông tin - BQP</p>
          <p>Bảo mật theo Quy định An ninh mạng Quân đội</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
