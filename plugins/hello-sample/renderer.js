// 示例外部插件：演示契约（activate(host) → { page }）
export async function activate(host) {
  let clicks = Number(host.storage.get('clicks') || '0')
  return {
    setup() { console.log('[hello-sample] setup, storage clicks =', clicks) },
    page: {
      title: '示例',
      mount(container, ctx) {
        container.innerHTML = `
          <div style="padding:32px;max-width:560px;margin:0 auto;font-size:13px;color:var(--text-primary)">
            <h2 style="font-size:18px;margin:0 0 6px">示例插件</h2>
            <p style="color:var(--text-secondary);margin:0 0 18px">
              这是一个外部插件。它演示了整页挂载、命名空间存储与桌面能力调用。
            </p>
            <button id="hp-click" style="padding:8px 16px;border-radius:6px;border:0;background:var(--accent-color);color:var(--bg-primary);cursor:pointer">
              点我 (${clicks})
            </button>
            <button id="hp-toast" style="padding:8px 16px;border-radius:6px;border:1px solid var(--border-color);background:transparent;color:var(--text-secondary);cursor:pointer;margin-left:8px">
              弹一个提示
            </button>
          </div>`
        const b1 = container.querySelector('#hp-click')
        const b2 = container.querySelector('#hp-toast')
        b1.onclick = () => { clicks += 1; host.storage.set('clicks', String(clicks)); b1.textContent = `点我 (${clicks})` }
        b2.onclick = () => host.toast('来自示例插件的提示', 'success')
      },
      unmount(container) { container.innerHTML = '' }
    }
  }
}
