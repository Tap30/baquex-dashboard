# Dashboard Entity

The Dashboard entity manages user profile, permissions, and dashboard
initialization logic.

## Architecture

The Dashboard entity follows a **query-first, store-sync** pattern:

1. **Initialization**: `Dashboard.components.Initializer` wraps the app in
   `App.tsx`
2. **Data Fetching**: Initializer fetches data using
   `Dashboard.queries.useDashboardQuery()`
3. **Cache Subscription**: Query cache updates are automatically synced to
   `Dashboard.stores`
4. **Global Access**: Components access data via `Dashboard.hooks` without prop
   drilling
5. **Single Source of Truth**: React Query cache is the primary data source

This pattern ensures:

- App-level initialization before any routes render
- Automatic store updates when query refetches
- Global access to dashboard data throughout the app
- No manual store updates required

## Adding New Dashboard Data

When adding new data to dashboard initialization:

1. **Update types**: Add your data structure to `InitDashboardOutput` in
   `types.ts`
2. **Fetch in parallel**: Add your API call to `useDashboardQuery` using
   `Promise.all()`
3. **Create store**: Add a new store in `stores.ts` using `Container.create()`
4. **Create hook**: Export a hook to access your store (e.g., `useYourData()`)
5. **Sync in Initializer**: Update the cache subscription in `Initializer.tsx`
   to sync your data
6. **Export from Dashboard**: Add your hook to `Dashboard.hooks` and store to
   `Dashboard.stores`

**Example:**

```ts
// 1. types.ts - Update output type
export type InitDashboardOutput = {
  user: {
    profile: DashboardUserProfile;
    permissions: DashboardUserPermission[];
  };
  settings: Settings; // Add your data
};

// 2. queries.ts - Fetch in parallel
const [userProfile, userPermissions, settings] = await Promise.all([
  fetchProfile(),
  fetchPermissions(),
  fetchSettings(), // Your API call
]);

// 3. stores.ts - Create store and hook
export const dashboardSettingsStore = Container.create<Settings>(DEFAULT_SETTINGS);
export const useSettings = () => useValue(dashboardSettingsStore);

// 4. Initializer.tsx - Sync to store
if (data) {
  void Promise.all([
    dashboardProfileStore.setValue(data.user.profile),
    dashboardPermissionsStore.setValue(data.user.permissions),
    dashboardSettingsStore.setValue(data.settings), // Sync your data
  ]);
}

// 5. Dashboard.ts - Export
public static hooks = {
  usePermissions,
  useUserProfile,
  useSettings, // Add your hook
};
```

## Integration with App.tsx

The `Dashboard.components.Initializer` wraps the entire application in
`App.tsx`:

1. **App-level Initialization**: Fetches dashboard data before any routes render
2. **Query Execution**: Uses `Dashboard.queries.useDashboardQuery({})`
   internally
3. **Cache Subscription**: Subscribes to React Query cache and syncs data to
   `Dashboard.stores`
4. **Store Updates**: Updates stores when query data changes (profile,
   permissions, etc.)
5. **Store Reset**: Clears stores when query data is invalidated
6. **Loading State**: Shows `SuspenseFallback` during initial fetch

**Data Flow:**

```txt
App.tsx
  └─ Dashboard.components.Initializer
       └─ useDashboardQuery → React Query Cache
            └─ Cache Subscription → Dashboard.stores
                 └─ Dashboard.hooks → Components
```

**Usage in App.tsx:**

```tsx
<Dashboard.components.Initializer>
  <AccessControlProvider>
    <RouterProvider router={router} />
  </AccessControlProvider>
</Dashboard.components.Initializer>
```

Components access data using `Dashboard.hooks` without needing to query
directly:

```tsx
const profile = Dashboard.hooks.useUserProfile();
const permissions = Dashboard.hooks.usePermissions();
```
