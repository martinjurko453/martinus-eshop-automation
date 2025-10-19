export class Logger {
  private static icons = {
    info: '🟦',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    step: '🧩',
    cleanup: '🧹',
  };

  private static getTimestamp(): string {
    return new Date().toLocaleTimeString();
  }

  static log(message: string, type: keyof typeof Logger.icons = 'info'): void {
    const icon = Logger.icons[type] || '';
    console.log(`${icon} [${Logger.getTimestamp()}] ${message}`);
  }

  static step(message: string): void {
    this.log(message, 'step');
  }

  static success(message: string): void {
    this.log(message, 'success');
  }

  static warn(message: string): void {
    this.log(message, 'warning');
  }

  static error(message: string): void {
    this.log(message, 'error');
  }

  static cleanup(message: string): void {
    this.log(message, 'cleanup');
  }
}