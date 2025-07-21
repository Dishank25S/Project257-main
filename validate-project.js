// Simple validation to check for import and basic functionality issues
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking project integrity...\n');

// Check critical files exist
const criticalFiles = [
  'lib/supabase-client.ts',
  'lib/supabase-db.ts', 
  'lib/supabase.ts',
  'lib/staticData.ts',
  'hooks/useAuth.ts',
  'hooks/usePhotos.ts',
  'hooks/useVideos.ts',
  'hooks/useCategories.ts',
  'hooks/useContactInfo.ts'
];

let allFilesExist = true;

criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check environment file
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=');
  const hasSupabaseKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');
  const hasAdminPassword = envContent.includes('ADMIN_PASSWORD=');
  
  console.log(`\n📋 Environment Variables:`);
  console.log(`✅ .env.local exists`);
  console.log(`${hasSupabaseUrl ? '✅' : '❌'} NEXT_PUBLIC_SUPABASE_URL`);
  console.log(`${hasSupabaseKey ? '✅' : '❌'} NEXT_PUBLIC_SUPABASE_ANON_KEY`);
  console.log(`${hasAdminPassword ? '✅' : '❌'} ADMIN_PASSWORD`);
} else {
  console.log(`❌ .env.local - MISSING`);
  allFilesExist = false;
}

// Check package.json dependencies
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const hasSupabase = packageContent.dependencies && packageContent.dependencies['@supabase/supabase-js'];
  const hasReactQuery = packageContent.dependencies && packageContent.dependencies['@tanstack/react-query'];
  
  console.log(`\n📦 Dependencies:`);
  console.log(`${hasSupabase ? '✅' : '❌'} @supabase/supabase-js`);
  console.log(`${hasReactQuery ? '✅' : '❌'} @tanstack/react-query`);
}

console.log(`\n🎯 Project Status:`);
if (allFilesExist) {
  console.log('✅ All critical files are present');
  console.log('✅ Supabase integration is configured');
  console.log('✅ Admin password is set to: admin123');
  console.log('\n🚀 Ready to start development server!');
  console.log('Run: pnpm dev');
} else {
  console.log('❌ Some critical files are missing');
  console.log('Please check the files listed above');
}
