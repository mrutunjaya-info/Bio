# 📚 Bioinformatics Syllabus Management System

A modern, feature-rich syllabus management system built for M.Sc. Bioinformatics students. This application provides a comprehensive platform for managing course content, taking notes, organizing PDF resources, and conducting research.

## ✨ Features

### 📖 **Syllabus Management**
- **Multi-Semester Support**: Navigate through all 4 semesters
- **Subject Organization**: Complete course structure with credits and objectives
- **Unit Management**: Add, edit, and delete course units
- **Content Editing**: Modify unit content with real-time updates
- **Distraction-Free Reading**: Clean, focused reading interface

### 📝 **Notes System**
- **Rich Text Editor**: Markdown support with formatting toolbar
- **Real-time Preview**: Switch between edit and preview modes
- **Search Functionality**: Find notes quickly across all subjects
- **Auto-save**: All changes persist automatically
- **Export Ready**: Well-formatted notes for easy sharing

### 📄 **PDF Resource Management**
- **URL-based Storage**: Link to online PDF resources
- **Google Drive Integration**: Built-in PDF viewer
- **Organization**: Categorize PDFs by subject and semester
- **Quick Access**: Direct links to all your study materials

### 🤖 **AI Research Assistant**
- **ChatGPT Integration**: Built-in research assistant
- **Context-Aware**: Helps with academic research
- **Direct Integration**: Insert AI responses into notes
- **Real-time Chat**: Interactive conversation interface

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all devices
- **Touch Gestures**: Swipe navigation for mobile
- **Table of Contents**: Auto-generated navigation
- **Floating Action Button**: Quick access to all features

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bioinformatics-syllabus.git
   cd bioinformatics-syllabus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: localStorage (client-side)
- **Deployment**: Netlify

## 📱 Usage

### Navigation
- Use the **Settings Panel** (bottom-left) to switch themes and semesters
- Use the **FAB** (bottom-center) for quick navigation to Syllabus, Notes, or PDFs

### Reading Syllabus
- Click "Read" on any subject card
- Use the **Table of Contents** button or swipe gesture for navigation
- Add/edit units using the green "Add Unit" button
- Create notes directly from unit content

### Managing Notes
- Access via FAB → Notes or subject card notes counter
- Use the **Research** button for AI assistance
- Format text with markdown syntax
- Preview notes before saving

### PDF Resources
- Access via FAB → PDFs or subject card PDF counter
- Add PDF URLs (Google Drive, Dropbox, direct links)
- Test URLs before saving
- View PDFs in integrated viewer

## 🎯 Key Features Explained

### Semester Data
The application includes complete syllabus data for:
- **Semester I**: Introduction to Bioinformatics, Molecular Biology, Statistics
- **Semester II**: Statistical Genomics, Genome Assembly, Programming
- **Semester III**: Biomolecular Modeling, Transcriptomics, Data Management
- **Semester IV**: Research and Seminar

### Data Persistence
- All user data (notes, PDFs, syllabus edits) stored in localStorage
- No server required - fully client-side application
- Data persists between sessions

### Responsive Design
- Mobile-first approach
- Touch gestures for navigation
- Optimized for tablets and desktops
- Dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for M.Sc. Bioinformatics students
- Inspired by modern note-taking applications
- Uses open-source libraries and tools

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ for Bioinformatics Students**