module.exports = {
  types: [
    { value: 'feat(frontend)', name: 'feat:     ✨ Новая функциональность' },
    { value: 'fix(frontend)', name: 'fix:      🐛 Исправление бага' },
    { value: 'docs(frontend)', name: 'docs:     📚 Документация' },
    { value: 'style(frontend)', name: 'style:    💄 Форматирование кода' },
    { value: 'refactor(frontend)', name: 'refactor: ♻️  Рефакторинг' },
    { value: 'perf(frontend)', name: 'perf:     ⚡ Улучшение производительности' },
    { value: 'test(frontend)', name: 'test:     ✅ Тесты' },
    { value: 'build(frontend)', name: 'build:    📦 Сборка' },
    { value: 'ci(frontend)', name: 'ci:       🎡 CI/CD' },
    { value: 'chore(frontend)', name: 'chore:    🔧 Технические изменения' },
  ],
  
  messages: {
    type: 'Выберите тип изменения:',
    subject: 'Краткое описание изменения:\n',
    confirmCommit: 'Подтвердить коммит?',
  },
  
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
}
