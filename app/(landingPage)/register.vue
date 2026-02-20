<template>
  <div class="min-h-screen flex bg-white dark:bg-[#191919]">
    <!-- Left: Form -->
    <div
      class="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 border-r border-[#e1e1e1] dark:border-[#2f2f2f] bg-white dark:bg-[#191919]"
    >
      <div class="w-full max-w-sm mx-auto space-y-8">
        <div>
          <div class="text-4xl mb-4">✨</div>
          <h2 class="text-2xl font-bold tracking-tight text-[#37352f] dark:text-[#d4d4d4]">Join InterviewKit</h2>
          <p class="mt-2 text-sm text-[#9b9b9b] dark:text-[#6e6e6e]">
            Already have an account?
            <router-link
              to="/login"
              class="font-medium text-[#37352f] dark:text-[#d4d4d4] hover:underline underline-offset-4"
            >
              Sign in
            </router-link>
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#37352f] dark:text-[#d4d4d4] mb-1.5">Email</label>
            <input
              type="email"
              class="block w-full px-3 py-2 text-sm bg-white dark:bg-[#202020] border border-[#e1e1e1] dark:border-[#2f2f2f] rounded shadow-sm text-[#37352f] dark:text-[#d4d4d4] placeholder:text-[#9b9b9b]/60 focus:outline-none focus:ring-1 focus:ring-[#37352f] dark:focus:ring-[#d4d4d4] transition-shadow"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[#37352f] dark:text-[#d4d4d4] mb-1.5">Password</label>
            <input
              type="password"
              class="block w-full px-3 py-2 text-sm bg-white dark:bg-[#202020] border border-[#e1e1e1] dark:border-[#2f2f2f] rounded shadow-sm text-[#37352f] dark:text-[#d4d4d4] placeholder:text-[#9b9b9b]/60 focus:outline-none focus:ring-1 focus:ring-[#37352f] dark:focus:ring-[#d4d4d4] transition-shadow"
              placeholder="Min. 8 characters"
            />
          </div>

          <div class="flex items-start gap-2 text-xs text-[#9b9b9b] dark:text-[#6e6e6e]">
            <input type="checkbox" class="mt-0.5 rounded border-[#e1e1e1] dark:border-[#2f2f2f] text-[#37352f]" />
            <span>
              I agree to the
              <a href="#" class="underline hover:text-[#37352f] dark:hover:text-[#d4d4d4]">Terms of Service</a>
              and
              <a href="#" class="underline hover:text-[#37352f] dark:hover:text-[#d4d4d4]">Privacy Policy</a>
            </span>
          </div>

          <button
            class="w-full px-4 py-2 text-sm font-medium bg-[#37352f] dark:bg-[#d4d4d4] text-white dark:text-[#191919] rounded shadow-sm hover:opacity-90 transition-opacity"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>

    <!-- Right: Minimal Info -->
    <div class="hidden lg:flex flex-1 items-center justify-center bg-[#f7f7f5] dark:bg-[#202020]">
      <div class="text-center space-y-6 max-w-md p-8">
        <div class="text-6xl animate-pulse">⚡️</div>
        <h3 class="text-xl font-medium text-[#37352f] dark:text-[#d4d4d4]">"Stop guessing. Start improving."</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
