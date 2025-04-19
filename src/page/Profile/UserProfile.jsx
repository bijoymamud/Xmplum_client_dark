

export default function UserProfile() {
  return (
    <div className="card max-w-md mx-auto overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-slate-100 to-slate-200" />
      <div className="px-6 pb-6">
        <div className="flex justify-between items-start -mt-12">
          <div className="avatar h-20 w-20 border-4 border-background">
            <img
              className="rounded-full"
              src="/placeholder.svg?height=80&width=80"
              alt="Sarah Johnson"
            />
            <span className="text-lg font-bold">SJ</span>
          </div>
        
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Sarah Johnson</h2>
            <span className="badge badge-secondary ml-1">Product Designer</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted mt-1">
            <div className="flex items-center">
             
              <span>San Francisco</span>
            </div>
            <div className="flex items-center">
              
              <span>Acme Inc.</span>
            </div>
            <div className="flex items-center">
            
              <span>Since 2021</span>
            </div>
          </div>

          <p className="text-sm mt-4">
            Creating intuitive digital experiences with a focus on accessibility and user-centered design systems.
          </p>
        </div>

        {/* DaisyUI Tabs */}
        <div className="tabs mt-6">
          <a className="tab tab-lifted tab-active">Stats</a>
          <a className="tab tab-lifted">Projects</a>
          <a className="tab tab-lifted">About</a>
        </div>

        {/* Stats Content */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-xl font-bold">142</span>
              <span className="text-xs text-muted">Posts</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-xl font-bold">3.2k</span>
              <span className="text-xs text-muted">Followers</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-xl font-bold">268</span>
              <span className="text-xs text-muted">Following</span>
            </div>
          </div>
        </div>

        {/* Projects Content */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Design System</span>
            <span className="badge badge-accent">Active</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Mobile App Redesign</span>
            <span className="badge badge-outline">Completed</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="font-medium">Website Prototype</span>
            <span className="badge badge-outline">Completed</span>
          </div>
        </div>

        {/* About Content */}
        <div className="mt-6 space-y-4">
          <p className="text-sm">
            Product designer with 5+ years of experience creating user-centered digital products. Specialized in
            design systems, accessibility, and interactive prototyping.
          </p>
          <div>
            <h3 className="text-sm font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-secondary">UI Design</span>
              <span className="badge badge-secondary">UX Research</span>
              <span className="badge badge-secondary">Prototyping</span>
              <span className="badge badge-secondary">Design Systems</span>
              <span className="badge badge-secondary">Figma</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
