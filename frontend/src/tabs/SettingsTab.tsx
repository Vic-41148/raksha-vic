import { useState } from 'react'
import { Moon, Sun, LogOut, Save, Bell, Shield, Phone, Globe, ChevronRight, ChevronLeft, Trash2 } from 'lucide-react'
import type { UserConfig, GoogleUser, Theme } from '../App'

interface Props {
  user: GoogleUser; config: UserConfig; theme: Theme;
  onUpdate: (c: UserConfig) => void; onLogout: () => void; onToggleTheme: () => void;
}

type SubPage = 'main' | 'privacy' | 'notifications' | 'emergency' | 'language'

export function SettingsTab({ user, config, theme, onUpdate, onLogout, onToggleTheme }: Props) {
  const [city, setCity] = useState(config.city)
  const [country, setCountry] = useState(config.country)
  const [kids, setKids] = useState(config.kids_present)
  const [elderly, setElderly] = useState(config.elderly_present)
  const [saved, setSaved] = useState(false)
  const [activePage, setActivePage] = useState<SubPage>('main')

  // Dummy states for subpages
  const [analytics, setAnalytics] = useState(true)
  const [locHistory, setLocHistory] = useState(false)
  const [pushAlerts, setPushAlerts] = useState(true)
  const [dailyDigest, setDailyDigest] = useState(true)
  const [autoSms, setAutoSms] = useState(false)
  const [lang, setLang] = useState('en')
  const [tempUnit, setTempUnit] = useState('c')

  const dirty = city !== config.city || country !== config.country
    || kids !== config.kids_present || elderly !== config.elderly_present

  const handleSave = () => {
    onUpdate({ city, country, kids_present: kids, elderly_present: elderly })
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const isDemo = user.email === 'demo@raksha.app'

  if (activePage === 'privacy') {
    return (
      <div className="anim-fade-up" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActivePage('main')} className="md-icon-btn" style={{ background: 'var(--md-surface-container)' }}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="md-title-large" style={{ margin: 0 }}>Privacy & Security</h2>
        </div>
        
        <div className="md-card-outlined" style={{ overflow: 'hidden' }}>
          <div className="md-list-item">
            <div style={{ flex: 1 }}>
              <p className="md-body-large" style={{ margin: '0 0 2px' }}>Anonymous Analytics</p>
              <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>Help us improve Raksha</p>
            </div>
            <label className="md-switch">
              <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} />
              <div className="md-switch-track" /><div className="md-switch-thumb" />
            </label>
          </div>
          <div className="md-divider" />
          <div className="md-list-item">
            <div style={{ flex: 1 }}>
              <p className="md-body-large" style={{ margin: '0 0 2px' }}>Location History</p>
              <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>Save past locations for faster alerts</p>
            </div>
            <label className="md-switch">
              <input type="checkbox" checked={locHistory} onChange={e => setLocHistory(e.target.checked)} />
              <div className="md-switch-track" /><div className="md-switch-thumb" />
            </label>
          </div>
        </div>

        <button className="md-btn md-btn-text" style={{ color: 'var(--md-error)', alignSelf: 'flex-start' }}>
          <Trash2 size={18} /> Clear all local data
        </button>
      </div>
    )
  }

  if (activePage === 'notifications') {
    return (
      <div className="anim-fade-up" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActivePage('main')} className="md-icon-btn" style={{ background: 'var(--md-surface-container)' }}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="md-title-large" style={{ margin: 0 }}>Notifications</h2>
        </div>
        
        <div className="md-card-outlined" style={{ overflow: 'hidden' }}>
          <div className="md-list-item">
            <div style={{ flex: 1 }}>
              <p className="md-body-large" style={{ margin: '0 0 2px' }}>Severe Weather Push Alerts</p>
              <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>Immediate alerts for danger levels</p>
            </div>
            <label className="md-switch">
              <input type="checkbox" checked={pushAlerts} onChange={e => setPushAlerts(e.target.checked)} />
              <div className="md-switch-track" /><div className="md-switch-thumb" />
            </label>
          </div>
          <div className="md-divider" />
          <div className="md-list-item">
            <div style={{ flex: 1 }}>
              <p className="md-body-large" style={{ margin: '0 0 2px' }}>Daily Safety Digest</p>
              <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>Morning summary of conditions</p>
            </div>
            <label className="md-switch">
              <input type="checkbox" checked={dailyDigest} onChange={e => setDailyDigest(e.target.checked)} />
              <div className="md-switch-track" /><div className="md-switch-thumb" />
            </label>
          </div>
        </div>
      </div>
    )
  }

  if (activePage === 'emergency') {
    return (
      <div className="anim-fade-up" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActivePage('main')} className="md-icon-btn" style={{ background: 'var(--md-surface-container)' }}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="md-title-large" style={{ margin: 0 }}>Emergency Contacts</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="md-field-label">Primary Contact Name</label>
            <input className="md-field-input" type="text" placeholder="e.g. Mom" />
          </div>
          <div>
            <label className="md-field-label">Phone Number</label>
            <input className="md-field-input" type="tel" placeholder="+1 234 567 890" />
          </div>
        </div>

        <div className="md-card-outlined" style={{ overflow: 'hidden' }}>
          <div className="md-list-item">
            <div style={{ flex: 1 }}>
              <p className="md-body-large" style={{ margin: '0 0 2px' }}>Auto-SMS on Danger</p>
              <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>Send location if risk is High</p>
            </div>
            <label className="md-switch">
              <input type="checkbox" checked={autoSms} onChange={e => setAutoSms(e.target.checked)} />
              <div className="md-switch-track" /><div className="md-switch-thumb" />
            </label>
          </div>
        </div>
        
        <button className="md-btn md-btn-filled md-btn-lg">Save Contacts</button>
      </div>
    )
  }

  if (activePage === 'language') {
    return (
      <div className="anim-fade-up" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActivePage('main')} className="md-icon-btn" style={{ background: 'var(--md-surface-container)' }}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="md-title-large" style={{ margin: 0 }}>Language & Region</h2>
        </div>

        <div>
          <label className="md-field-label">App Language</label>
          <select className="md-field-input" value={lang} onChange={e => setLang(e.target.value)} style={{ appearance: 'none', height: 48 }}>
            <option value="en">English (US)</option>
            <option value="hi">Hindi (India)</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div>
          <label className="md-field-label">Temperature Unit</label>
          <select className="md-field-input" value={tempUnit} onChange={e => setTempUnit(e.target.value)} style={{ appearance: 'none', height: 48 }}>
            <option value="c">Celsius (°C)</option>
            <option value="f">Fahrenheit (°F)</option>
          </select>
        </div>
      </div>
    )
  }

  return (
    <div className="anim-fade-up" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* User card */}
      <div className="md-card-filled" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        {user.picture
          ? <img src={user.picture} alt={user.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
          : <div className="md-avatar">{user.name?.[0]}</div>
        }
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="md-title-medium" style={{ margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
          <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
        </div>
      </div>

      {/* Google Sign In Call-to-Action for Demo Users */}
      {isDemo && (
        <div className="d-100">
          <button 
            className="md-btn md-btn-filled md-btn-lg" 
            style={{ width: '100%', background: '#fff', color: '#3c4043', border: '1px solid #dadce0', boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3)' }}
            onClick={() => {
              onLogout()
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
          <p className="md-body-small" style={{ color: 'var(--md-on-surface-variant)', marginTop: 8, textAlign: 'center' }}>
            Sync your safety data across devices
          </p>
        </div>
      )}

      {/* Account Settings */}
      <div className="d-150">
        <p className="md-label-large" style={{ color: 'var(--md-on-surface-variant)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Account & Security</p>
        <div className="md-card-outlined" style={{ overflow: 'hidden' }}>
          {[
            { id: 'privacy',       icon: <Shield size={20} color="var(--md-on-surface)" />, title: 'Privacy & Security', desc: 'Manage your data and privacy settings' },
            { id: 'notifications', icon: <Bell size={20} color="var(--md-on-surface)" />, title: 'Notifications', desc: 'Push, SMS, and Email alerts' },
            { id: 'emergency',     icon: <Phone size={20} color="var(--md-on-surface)" />, title: 'Emergency Contacts', desc: 'Manage trusted contacts' },
            { id: 'language',      icon: <Globe size={20} color="var(--md-on-surface)" />, title: 'Language & Region', desc: 'English (US)' },
          ].map((item, i) => (
            <div key={item.id}>
              {i > 0 && <div className="md-divider" />}
              <div className="md-list-item" style={{ cursor: 'pointer' }} onClick={() => setActivePage(item.id as SubPage)}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--md-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p className="md-body-large" style={{ margin: '0 0 2px' }}>{item.title}</p>
                  <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>{item.desc}</p>
                </div>
                <ChevronRight size={20} color="var(--md-on-surface-variant)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="d-200">
        <p className="md-label-large" style={{ color: 'var(--md-on-surface-variant)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Appearance</p>
        <div className="md-card-outlined" style={{ overflow: 'hidden' }}>
          <div className="md-list-item">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--md-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'dark' ? <Moon size={20} color="var(--md-on-surface)" /> : <Sun size={20} color="var(--md-on-surface)" />}
            </div>
            <div style={{ flex: 1 }}>
              <p className="md-body-large" style={{ margin: '0 0 2px' }}>Dark Mode</p>
              <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>
                {theme === 'dark' ? 'Currently on' : 'Currently off'}
              </p>
            </div>
            <label className="md-switch">
              <input type="checkbox" checked={theme === 'dark'} onChange={onToggleTheme} />
              <div className="md-switch-track" />
              <div className="md-switch-thumb" />
            </label>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="d-250">
        <p className="md-label-large" style={{ color: 'var(--md-on-surface-variant)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Location Preferences</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="md-field-label">Primary City</label>
            <input className="md-field-input" type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Mumbai" />
          </div>
          <div>
            <label className="md-field-label">Country</label>
            <input className="md-field-input" type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. India" />
          </div>
        </div>
      </div>

      {/* Household */}
      <div className="d-300">
        <p className="md-label-large" style={{ color: 'var(--md-on-surface-variant)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Household Settings</p>
        <div className="md-card-outlined" style={{ overflow: 'hidden' }}>
          {[
            { label: 'Children present', sub: 'Increases caution threshold', val: kids, set: setKids },
            { label: 'Elderly present',  sub: 'Increases caution threshold', val: elderly, set: setElderly },
          ].map(({ label, sub, val, set }, i) => (
            <div key={label}>
              {i > 0 && <div className="md-divider" />}
              <div className="md-list-item">
                <div style={{ flex: 1 }}>
                  <p className="md-body-large" style={{ margin: '0 0 2px' }}>{label}</p>
                  <p className="md-body-small" style={{ margin: 0, color: 'var(--md-on-surface-variant)' }}>{sub}</p>
                </div>
                <label className="md-switch">
                  <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} />
                  <div className="md-switch-track" />
                  <div className="md-switch-thumb" />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      {dirty && (
        <button className="md-btn md-btn-filled md-btn-lg anim-slide-up" style={{ width: '100%' }} onClick={handleSave}>
          <Save size={18} /> {saved ? 'Saved & refreshed ✓' : 'Save & Refresh'}
        </button>
      )}

      {/* Sign out */}
      <div className="d-400">
        <div className="md-divider" style={{ margin: '16px 0 16px' }} />
        <button
          className="md-btn md-btn-text"
          style={{ width: '100%', color: 'var(--md-error)', minHeight: 48, justifyContent: 'flex-start', padding: '10px 16px' }}
          onClick={onLogout}
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  )
}
